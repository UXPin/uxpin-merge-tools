import safe = require('colors/safe');
import * as http from 'http';
import { createServer, Options } from 'http-server';
import * as https from 'https';

import { Warned } from '../../common/warning/Warned';
import { TEMP_DIR_PATH } from '../building/config/getConfig';
import { DesignSystemDefinition } from '../serialization/DesignSystemDefinition';
import { SERVER_PORT, SERVER_SUCCESS_MESSAGE, SERVER_URL } from './serverConfig';
import { writeStaticIndexFile } from './writeStaticIndexFile';

export function startServer({ result: { components } }:Warned<DesignSystemDefinition>):Promise<void> {
  return writeStaticIndexFile(components)
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

function getLogString(req:http.IncomingMessage, res:http.ServerResponse, err:Error):string {
  const reqString:string = `${req.method} ${req.url} ${res.statusCode}`;

  if (err) {
    return safe.red(`${reqString} ${err.message}`);
  }

  return safe.green(reqString);
}
