import { createServer, Server } from 'http';
import { getAPPExperimentationRemoteURL } from '../app/getAPPExperimentationRemoteURL';
import { EPID } from '../epid/EPID';
import { printServerReadyMessage } from './console/printServerReadyMessage';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { GetCategoriesHandler } from './handler/code/GetCategoriesHandler';
import { GetPreviewsHandler } from './handler/code/GetPreviewsHandler';
import { GetRepositoryPointerHandler } from './handler/code/GetRepositoryPointerHandler';
import { GetLibrariesHandler } from './handler/libraries/GetLibrariesHandler';
import { GetLibrariesIndexHandler } from './handler/libraries/GetLibrariesIndexHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { SetActivePageHandler } from './handler/page/set/SetActivePageHandler';
import { RequestHandler } from './handler/RequestHandler';
import { PrepareUploadHandler } from './handler/upload/PrepareUploadHandler';
import { UploadHandler } from './handler/upload/UploadHandler';
import { ServerRouter } from './router/ServerRouter';

export interface ExperimentationServerOptions extends ExperimentationServerContext {
  projectRoot:string;
  skipBrowser:boolean;
}

export interface ExperimentationServerContext {
  port:number;
  bundlePath:string;
  epid:EPID;
  uxpinDirPath:string;
  uxpinDomain:string;
}

export async function startExperimentationServer(options:ExperimentationServerOptions):Promise<void> {
  const router:ServerRouter = new ServerRouter(options);
  registerHandlers(router, options);
  const server:Server = createServer((request, response) => {
    const handler:RequestHandler = router.route(request);
    handler.handle(request, response);
  });
  server.listen(options.port);
  const experimentationAppURL:string = getAPPExperimentationRemoteURL(options);
  await printServerReadyMessage(experimentationAppURL);
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  router.register('/ajax/dmsDPPage/SetActivePage/', new SetActivePageHandler(context));
  router.register('/ajax/dmsFileManager/PrepareUpload/', new PrepareUploadHandler(context));
  router.register('/upload/', new UploadHandler(context));
  router.register('/code/categories', new GetCategoriesHandler(context));
  router.register('/code/library.js', createLibraryBundleHandler(context));
  router.register('/code/previews', new GetPreviewsHandler(context));
  router.register('/code/repositoryPointer', new GetRepositoryPointerHandler(context));
  router.register('/libraries/', new GetLibrariesHandler(context));
  router.register('/libraries/items/index/', new GetLibrariesIndexHandler(context));
}
