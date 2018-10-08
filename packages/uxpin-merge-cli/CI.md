## How to run this project on CI?

To run this project on CI server, we expect the following environment variables to be defined:

#### `CI` 
expected value: `true`

Required by test tools to run in correct mode (e.g. remote Chromeless)

#### `CHROMELESS_ENDPOINT_URL`, `CHROMELESS_ENDPOINT_API_KEY`
Credentials to the Chromeless proxy service installed on the AWS Lambda. More info in [Chromeless docs](https://github.com/graphcool/chromeless/tree/master/serverless#using-the-proxy).

