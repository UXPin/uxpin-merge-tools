import { createServer, Server } from 'http';
import { EPID } from '../epid/EPID';
import { getProjectEPID } from '../epid/getProjectEPID';
import { createLibraryBundleHandler } from './handler/bundle/createLibraryBundleHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

export const SERVER_READY_OUTPUT:RegExp = /Experimental Mode/;

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
  displayMergeBanner();
  console.log(await getExperimentalURL(options));
}

function registerHandlers(router:ServerRouter, context:ExperimentationServerContext):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  router.register('/code/library.js', createLibraryBundleHandler(context));
}

function displayMergeBanner():void {
  console.log(`
┌─────────┐
│         │
│  UXPin  │ {\\/}erge - Experimental Mode
│         │
└─────────┘
`);
}

async function getExperimentalURL(options:ExperimentationServerOptions):Promise<string> {
  const epid:EPID = await getProjectEPID(options.projectRoot);
  return `https://app.${options.uxpinDomain}/experiment/${epid.revisionId}?port=${options.port}`;
}
