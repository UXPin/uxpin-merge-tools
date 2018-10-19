import { createServer, Server } from 'http';
import { getUXPinMergeBanner } from '../../../utils/banner/getUXPinMergeBanner';
import { getAPPExperimentationRemoteURL } from '../app/getAPPExperimentationRemoteURL';
import { EPID } from '../epid/EPID';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { GetCategoriesHandler } from './handler/code/GetCategoriesHandler';
import { GetRepositoryPointerHandler } from './handler/code/GetRepositoryPointerHandler';
import { GetLibrariesHandler } from './handler/libraries/GetLibrariesHandler';
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
  console.log(getUXPinMergeBanner(mode));
  console.log(await getAPPExperimentationRemoteURL(options));
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  router.register('/code/library.js', createLibraryBundleHandler(context));
  router.register('/libraries/', new GetLibrariesHandler(context));
  router.register('/code/repositoryPointer', new GetRepositoryPointerHandler(context));
  router.register('/code/categories', new GetCategoriesHandler(context));
}
