curl -X POST \
-F 'filename=@test-file.txt' \
-H 'Content-Type: text/plain' \
'https://YOUR-RESOURCE-NAME.azurewebsites.net/api/upload?code=YOUR-FUNCTION-KEY&filename=test-file.txt&username=jsmith&code=abc' --verbose