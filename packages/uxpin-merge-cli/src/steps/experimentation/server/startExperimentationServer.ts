import { createServer, Server } from 'http';
import { EPID } from '../epid/EPID';
import { printServerReadyMessage } from './console/printServerReadyMessage';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { GetLibrariesHandler } from './handler/libraries/GetLibrariesHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { SetActivePageHandler } from './handler/page/set/SetActivePageHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

export interface ExperimentationServerOptions extends ExperimentationServerContext {
  projectRoot:string;
}

export interface ExperimentationServerContext {
  port:number;
  bundlePath:string;
  epid:EPID;
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
  router.register('/libraries/', new GetLibrariesHandler(context));
}
