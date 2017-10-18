import safe = require('colors/safe');
import { writeFile } from 'fs';
import * as http from 'http';
import { createServer, Options } from 'http-server';
import * as https from 'https';

import { TEMP_DIR_PATH } from '../steps/building/config/getConfig';
import { SERVER_PORT, SERVER_SUCCESS_MESSAGE, SERVER_URL } from './serverConfig';

const INDEX_HTML_TEMPLATE:string = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>It works</title>
</head>
<body>
    It works!
</body>
</html>`;

export function startServer():Promise<void> {
  return writeStaticTemplateFile()
    .then(() => {
      const options:Options = {
        logFn: (req, res, err) => console.log(getLogString(req, res, err)),
        root: TEMP_DIR_PATH,
      };
      const server:http.Server | https.Server = createServer(options);
      server.listen(SERVER_PORT, () => console.log(`server ready on ${SERVER_URL}!`));
    })
    .then(() => console.log(SERVER_SUCCESS_MESSAGE));
}

function writeStaticTemplateFile():Promise<string> {
  return new Promise((resolve, reject) => {
    const indexPath:string = `${TEMP_DIR_PATH}/index.html`;
    writeFile(indexPath, INDEX_HTML_TEMPLATE, 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve(indexPath);
    });
  });
}

function getLogString(req:http.IncomingMessage, res:http.ServerResponse, err:Error):string {
  const reqString:string = `${req.method} ${req.url} ${res.statusCode}`;

  if (err) {
    return safe.red(`${reqString} ${err.message}`);
  }

  return safe.green(reqString);
}
