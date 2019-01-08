import { MovedFilePathsMap } from '../steps/serialization/DesignSystemSnapshot';
import { CommitMetadata, RepositoryAdapter, RepositoryPointer } from './RepositoryAdapter';

// tslint:disable prefer-function-over-method
export abstract class AbstractRepositoryAdapter implements RepositoryAdapter {
  public async getRepositoryPointer():Promise<RepositoryPointer> {
    return {
      branchName: await this.getCurrentBranch(),
      commit: await this.getLatestCommit(),
    };
  }

  public getCurrentBranch():Promise<string> {
    throw new Error('Not implemented');
  }

  public getMovedFiles(r1:string, r2:string):Promise<MovedFilePathsMap> {
    throw new Error('Not implemented');
  }

  public getLatestCommit():Promise<CommitMetadata> {
    throw new Error('Not implemented');
  }
}
