import { createServer, Server } from 'http';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

export const SERVER_READY_OUTPUT:RegExp = /Server ready/;

export async function startExperimentationServer(options:ExperimentationServerOptions):Promise<void> {
  const router:ServerRouter = new ServerRouter();
  registerHandlers(router, options);
  const server:Server = createServer((request, response) => {
    const handler:RequestHandler = router.route(request);
    handler.handle(request, response);
  });
  server.listen(options.port);
  console.log('Server ready');
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
}

export interface ExperimentationServerOptions extends ExperimentationServerContext {
  port:number;
}

export interface ExperimentationServerContext {
  uxpinDomain:string;
  uxpinDirPath:string;
}
