import { createServer, Server } from 'http';
import { resolve } from 'path';
import { LIBRARY_OUTPUT_FILENAME, TEMP_DIR_NAME } from '../../building/config/getConfig';
import { EPID } from '../epid/EPID';
import { getProjectEPID } from '../epid/getProjectEPID';
import { StaticNoCacheFileHandler } from './handler/file/StaticNoCacheFileHandler';
import { PageSaveHandler } from './handler/page/save/PageSaveHandler';
import { RequestHandler } from './handler/RequestHandler';
import { ServerRouter } from './router/ServerRouter';

export const SERVER_READY_OUTPUT:RegExp = /Experimental Mode/;

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

function registerHandlers(router:ServerRouter, context:ExperimentationServerOptions):void {
  router.register('/ajax/dmsDPPage/Save/', new PageSaveHandler(context));
  const bundlePath:string = getLibraryBundleFilePath(context);
  router.register('/code/library.js', new StaticNoCacheFileHandler(context, bundlePath));
}

function getLibraryBundleFilePath({ projectRoot }:ExperimentationServerOptions):string {
  return resolve(projectRoot, TEMP_DIR_NAME, LIBRARY_OUTPUT_FILENAME);
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

export interface ExperimentationServerOptions extends ExperimentationServerContext {
  port:number;
  projectRoot:string;
}

export interface ExperimentationServerContext {
  uxpinDomain:string;
  uxpinDirPath:string;
}
