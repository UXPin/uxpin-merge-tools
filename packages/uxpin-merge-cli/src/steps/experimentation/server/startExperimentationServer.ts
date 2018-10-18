import { createServer, Server } from 'http';
import { printServerReadyMessage } from './console/printServerReadyMessage';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { SetActivePageHandler } from './handler/page/set/SetActivePageHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

export interface ExperimentationServerOptions extends ExperimentationServerContext {
  port:number;
  projectRoot:string;
}

export interface ExperimentationServerContext {
  bundlePath:string;
  uxpinDirPath:string;
  uxpinDomain:string;
}

export async function startExperimentationServer(options:ExperimentationServerOptions):Promise<void> {
  const router:ServerRouter = new ServerRouter();
  registerHandlers(router, options);
  const server:Server = createServer((request, response) => {
    const handler:RequestHandler = router.route(request);
    handler.handle(request, response);
  });
  server.listen(options.port);
  await printServerReadyMessage(options);
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  router.register('/ajax/dmsDPPage/SetActivePage/', new SetActivePageHandler(context));
  router.register('/code/library.js', createLibraryBundleHandler(context));
}
