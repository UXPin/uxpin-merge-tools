import { createServer, Server } from 'http';
import { OK } from 'http-status-codes';

export async function startExperimentationServer(options:ExperimentationServerOptions):Promise<void> {
  const server:Server = createServer((request, response) => {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
    });
    response.end(JSON.stringify({ hello: 'World!' }));
  });
  server.listen(options.port);
}

export interface ExperimentationServerOptions {
  uxpinDomain:string;
  port:number;
  uxpinDirPath:string;
}
