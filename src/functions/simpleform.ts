import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function status(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    try {
        // file content must be passed in as body
        const formData = await request.formData();


        const name = formData.get('name');
        return { body: `Hello  ${name}` };
    }
    catch (error) {
        return { body: `Error: ${error}` };
    }


};

app.http('status', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: status
});
