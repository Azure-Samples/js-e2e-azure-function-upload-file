import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import HTTP_CODES from "http-status-enum";
import * as multipart from "parse-multipart";

/*
Task: accept file, as multipart form request, send file (100MB max on Consumption plan) to Azure Storage.

Run the curl command in the same directory as the file:

curl -X POST  -F 'filename=@myfile.jpg' 'http://localhost:7071/api/upload?filename=newfilename.jpg&username=jsmith --verbose'

This curl command uses both the querystring and the multi-part form to pass relevant data to and through
this Azure Function. The querystring property value for `username` becomes the directory name inside the container. 
The querystring property value for `filename` becomes the file name used in the container. Both these 
querystring values are used in the `function.json` to construct the container location: `"path": "images/{username}/{filename}",`.
*/
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    context.log('upload HTTP trigger function processed a request.');

    if (!req.query?.username) {
        context.res.body = `username is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    if (!req.query?.filename) {
        context.res.body = `filename is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    if (!req.body || !req.body.length){
        context.res.body = `Request body is not defined`;
        context.res.status = HTTP_CODES.BAD_REQUEST
    }

    if(process?.env?.Environment==='Production' && (!process?.env?.AzureWebJobsStorage || process?.env?.AzureWebJobsStorage.length<10)){
        throw Error("Storage isn't configured correctly - get Storage Connection string from Azure portal");
    }

    try {
        // Each chunk of the file is delimited by a special string
        const bodyBuffer = Buffer.from(req.body);
        const boundary = multipart.getBoundary(req.headers["content-type"]);
        const parts = multipart.Parse(bodyBuffer, boundary);

        // The file buffer is corrupted or incomplete ?
        if (!parts?.length){
            context.res.body = `File buffer is incorrect`;
            context.res.status = HTTP_CODES.BAD_REQUEST
        }
        if(parts[0]?.filename)console.log(`Original filename = ${parts[0]?.filename}`);
        if(parts[0]?.type)console.log(`Content type = ${parts[0]?.type}`);
        if(parts[0]?.data?.length)console.log(`Size = ${parts[0]?.data?.length}`);

        // Passed to Storage
        context.bindings.storage = parts[0]?.data;

        // returned to requestor
        context.res.body = `${req.query?.username}/${req.query?.filename}`;
    } catch (err) {
        context.log.error(err.message);
        {
            context.res.body = `${err.message}`;
            context.res.status = HTTP_CODES.INTERNAL_SERVER_ERROR
        }
    }
    return context.res;
};

export default httpTrigger;