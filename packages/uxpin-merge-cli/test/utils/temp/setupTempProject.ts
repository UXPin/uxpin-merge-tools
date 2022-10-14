import { DeferredChain } from 'deferred-proxy-chain';
import { DirectoryResult } from 'tmp-promise';
import { GitOptions, prepareTempDir } from './prepareTempDir';

export interface TempProjectContext {
  getDirectory(): DirectoryResult;
}

export interface TempProjectOptions {
  gitOptions?: Partial<GitOptions>;
  sourceDir: string;
}

export function setupTempProject(options: TempProjectOptions): TempProjectContext {
  const deferredContext: DeferredChain<TempProjectContext> = new DeferredChain();
  let directoryResult: DirectoryResult;

  beforeAll(async () => {
    directoryResult = await prepareTempDir(options.sourceDir, options.gitOptions);
    deferredContext.setTarget(getContext(directoryResult));
  });

  afterAll(() => {
    directoryResult.cleanup();
  });

  return deferredContext.getProxy();
}

function getContext(directoryResult: DirectoryResult): TempProjectContext {
  return {
    getDirectory: () => directoryResult,
  };
}
