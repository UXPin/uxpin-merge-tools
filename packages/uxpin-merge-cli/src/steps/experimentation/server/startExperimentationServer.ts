import { createServer, Server } from 'http';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

export const SERVER_READY_OUTPUT:RegExp = /Server ready/;

export async function startExperimentationServer(options:ExperimentationServerOptions):Promise<void> {
  const router:ServerRouter = new ServerRouter();
  registerHandlers(router);
  const server:Server = createServer((request, response) => {
    const handler:RequestHandler = router.route(request);
    handler.handle(request, response);
  });
  server.listen(options.port);
  console.log('Server ready');
}

function registerHandlers(router:ServerRouter):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler());
}

export interface ExperimentationServerOptions {
  uxpinDomain:string;
  port:number;
  uxpinDirPath:string;
}
