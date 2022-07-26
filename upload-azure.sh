#!/bin/bash
FUNCTION_APP_RESOURCE_NAME="blob-storage-upload-function-app-jsmith"
FUNCTION_KEY="123456"

FUNCTION_URL="https://${FUNCTION_APP_RESOURCE_NAME}.azurewebsites.net/api/upload?code=${FUNCTION_KEY}&filename=test-file.txt&username=jsmith"

echo "${FUNCTION_URL}"

curl -X POST \
-F "filename=@test-file.txt" \
-H "Content-Type: text/plain" \
$FUNCTION_URL --verbose
