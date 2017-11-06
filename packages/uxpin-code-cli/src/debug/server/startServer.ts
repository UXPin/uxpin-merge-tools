import safe = require('colors/safe');
import * as http from 'http';
import { createServer, Options } from 'http-server';
import * as https from 'https';

import { TEMP_DIR_PATH } from '../../steps/building/config/getConfig';
import { ComponentDefinition } from '../../steps/serialization/component/ComponentDefinition';
import { copyRequiredFiles } from './copyRequiredFiles';
import { SERVER_SUCCESS_MESSAGE, SERVER_URL } from './serverConfig';
import { writeStaticIndexFile } from './writeStaticIndexFile';

interface ServerOptions {
  port:number;
  root:string;
}

export function startServer(components:ComponentDefinition[], serverOptions:ServerOptions):Promise<void> {
  const { port, root } = serverOptions;
  return copyRequiredFiles(root)
    .then((bundlePath) => writeStaticIndexFile(root, bundlePath, components))
    .then(() => {
      const options:Options = {
        headers: { 'Cache-Control': 'no-cache' },
        logFn: (req, res, err) => console.log(getLogString(req, res, err)),
        root: TEMP_DIR_PATH,
      };
      const server:http.Server | https.Server = createServer(options);
      server.listen(port, () => console.log(`server ready on ${SERVER_URL}:${port}/`));
    })
    .then(() => console.log(SERVER_SUCCESS_MESSAGE));
}

function getLogString(req:http.IncomingMessage, res:http.ServerResponse, err:Error):string {
  const reqString:string = `${req.method} ${req.url} ${res.statusCode}`;

  if (err) {
    return safe.red(`${reqString} ${err.message}`);
  }

  return safe.green(reqString);
}
