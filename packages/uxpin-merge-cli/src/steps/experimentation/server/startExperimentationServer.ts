import { createServer, Server } from 'http';
import { getAPPExperimentationRemoteURL } from '../app/getAPPExperimentationRemoteURL';
import { EPID } from '../epid/EPID';
import { printServerReadyMessage } from './console/printServerReadyMessage';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { GetCategoriesHandler } from './handler/code/GetCategoriesHandler';
import { GetPreviewsHandler } from './handler/code/GetPreviewsHandler';
import { GetRepositoryPointerHandler } from './handler/code/GetRepositoryPointerHandler';
import { GetVariablesHandler } from './handler/document/GetVariablesHandler';
import { GetLibrariesHandler } from './handler/libraries/GetLibrariesHandler';
import { GetLibrariesIndexHandler } from './handler/libraries/GetLibrariesIndexHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { SetActivePageHandler } from './handler/page/set/SetActivePageHandler';
import { GetPreviewAllDataHandler } from './handler/preview/GetPreviewAllDataHandler';
import { GetUploadedFileHandler } from './handler/upload/GetUploadedFileHandler';
import { PrepareUploadHandler } from './handler/upload/PrepareUploadHandler';
import { UploadHandler } from './handler/upload/UploadHandler';
import { ServerRouter } from './router/ServerRouter';

export interface ExperimentationServerOptions extends ExperimentationServerContext {
  projectRoot:string;
  skipBrowser:boolean;
}

export interface ExperimentationServerContext {
  ngrokSessionId?:string;
  port:number;
  bundlePath:string;
  epid:EPID;
  uxpinDirPath:string;
  uxpinDomain:string;
}

export async function startExperimentationServer(options:ExperimentationServerOptions):Promise<void> {
  const router:ServerRouter = new ServerRouter();
  registerHandlers(router, options);
  const server:Server = createServer((request, response) => router.handle(request, response));
  server.listen(options.port);
  const experimentationAppURL:string = getAPPExperimentationRemoteURL(options);
  await printServerReadyMessage(experimentationAppURL);
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  router.register('/ajax/dmsDPPage/SetActivePage/', new SetActivePageHandler(context));
  router.register('/ajax/dmsFileManager/PrepareUpload/', new PrepareUploadHandler(context));
  router.register('/upload', new UploadHandler(context));
  router.register(/\/upload\/(\d+)\/(.*)/, new GetUploadedFileHandler(context));
  router.register('/code/categories', new GetCategoriesHandler(context));
  router.register('/code/library.js', createLibraryBundleHandler(context));
  router.register('/code/previews', new GetPreviewsHandler(context));
  router.register('/code/repositoryPointer', new GetRepositoryPointerHandler());
  router.register(/^\/documents\/([a-z0-9-_]+)\/variables$/, new GetVariablesHandler(context));
  router.register('/libraries/', new GetLibrariesHandler(context));
  router.register('/libraries/items/index/', new GetLibrariesIndexHandler());
  router.register('/preview/all', new GetPreviewAllDataHandler(context));
}
