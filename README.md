# js-e2e-azure-function-upload-file

Learn how to use this sample in the [documentation](https://docs.microsoft.com/azure/developer/javascript/how-to/with-web-app/azure-function-file-upload).

## Clone, install and run

```bash
git clone https://github.com/azure-Samples/js-e2e-azure-function-upload-file && \
cd js-e2e-azure-function-upload-file && npm install \
npm start
```

## Use the function

Upload file from root of repo to storage emulator through Azure Function

```bash
curl -X POST  -F 'filename=@test-file.txt' 'http://localhost:7071/api/upload?filename=test-file.txt&username=jsmith' --verbose

```
