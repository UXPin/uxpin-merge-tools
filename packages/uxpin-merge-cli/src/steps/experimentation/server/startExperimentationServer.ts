import { createServer, Server } from 'http';
import { getUXPinMergeBanner } from '../../../utils/banner/getUXPinMergeBanner';
import { getAPPExperimentationRemoteURL } from '../app/getAPPExperimentationRemoteURL';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

const mode:string = 'Experimental Mode';
export const SERVER_READY_OUTPUT:RegExp = new RegExp(mode);

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
  console.log(getUXPinMergeBanner(mode));
  console.log(await getAPPExperimentationRemoteURL(options));
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  router.register('/code/library.js', createLibraryBundleHandler(context));
}
