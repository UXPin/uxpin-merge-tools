import { DeferredChain } from 'deferred-proxy-chain';
import { DirectoryResult } from 'tmp-promise';
import { GitOptions, prepareTempDir } from './prepareTempDir';

export interface TempProjectContext {
  getDirectory():DirectoryResult;
}

export interface TempProjectOptions {
  gitOptions?:Partial<GitOptions>;
  linkPackage?:boolean;
  projectPath?:string;
  sourceDir:string;
}

export function setupTempProject(options:TempProjectOptions):TempProjectContext {
  const {
    gitOptions,
    linkPackage,
    projectPath,
    sourceDir,
  } = options;
  const deferredContext:DeferredChain<TempProjectContext> = new DeferredChain();
  let directoryResult:DirectoryResult;

  beforeAll(async () => {
    directoryResult = await prepareTempDir(sourceDir, gitOptions, linkPackage, projectPath);
    deferredContext.setTarget(getContext(directoryResult));
  });

  afterAll(() => {
    directoryResult.cleanup();
  });

  return deferredContext.getProxy();
}

function getContext(directoryResult:DirectoryResult):TempProjectContext {
  return {
    getDirectory: () => directoryResult,
  };
}
