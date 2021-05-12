import safe = require('colors/safe');
import { readFile } from 'fs-extra';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';

import { TEMP_DIR_PATH } from '../../steps/building/config/getConfig';
import { ComponentDefinition } from '../../steps/serialization/component/ComponentDefinition';
import { copyRequiredFiles } from './copyRequiredFiles';
import { SERVER_SUCCESS_MESSAGE, SERVER_URL } from './serverConfig';
import { writeStaticIndexFile } from './writeStaticIndexFile';

const HTTP_STATUS_OK:number = 200;
const HTTP_STATUS_NOT_FOUND:number = 404;

interface ServerOptions {
  port:number;
  root:string;
}

export function startDebugServer(components:ComponentDefinition[], serverOptions:ServerOptions):Promise<void> {
  const { port, root } = serverOptions;
  return copyRequiredFiles(root)
    .then((bundlePath) => writeStaticIndexFile(root, bundlePath, components))
    .then(() => {
      const server:Server = createServer((req, res) => {
        const path:string = (req.url === '/' || req.url === undefined) ? '/index.html' : req.url;
        readFile(TEMP_DIR_PATH + path, (err, data) => {
          if (err) {
            res.writeHead(HTTP_STATUS_NOT_FOUND);
            console.log(getLogString(req, res));
            res.end(JSON.stringify(err));
            return;
          }
          res.writeHead(HTTP_STATUS_OK, { 'Cache-Control': 'no-cache' });
          console.log(getLogString(req, res));
          res.end(data);
        });
      });
      server.listen(port, () => console.log(`server ready on ${SERVER_URL}:${port}/`));
    })
    .then(() => console.log(SERVER_SUCCESS_MESSAGE));
}

function getLogString(req:IncomingMessage, res:ServerResponse):string {
  const reqString:string = `${req.method} ${req.url} ${res.statusCode}`;

  if (res.statusCode === HTTP_STATUS_NOT_FOUND) {
    return safe.red(`${reqString} NOT FOUND`);
  }

  return safe.green(reqString);
}
