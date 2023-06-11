#!/bin/bash


#FUNCTION_URL="https://YOUR-RESOURCE-NAME.azurewebsites.net/api/upload?code=YOUR-FUNCTION-KEY"
FUNCTION_URL="http://localhost:7071/api/status"

echo "${FUNCTION_URL}"

curl -X POST \
-F "name=dina" \
-H "content-type: multipart/form-data;" \
"$FUNCTION_URL" --verbose
