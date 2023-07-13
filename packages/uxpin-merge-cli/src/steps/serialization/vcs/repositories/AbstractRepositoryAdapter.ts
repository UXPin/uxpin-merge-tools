import { MovedFilePathsMap } from '../../DesignSystemSnapshot';
import { CommitMetadata, RepositoryAdapter, RepositoryPointer } from './RepositoryAdapter';

export abstract class AbstractRepositoryAdapter implements RepositoryAdapter {
  public async getRepositoryPointer(): Promise<RepositoryPointer> {
    return {
      branchName: await this.getCurrentBranch(),
      commit: await this.getLatestCommit(),
    };
  }

  public getCurrentBranch(): Promise<string> {
    throw new Error('Not implemented');
  }

  public getMovedFiles(revision1: string, revision2: string): Promise<MovedFilePathsMap> {
    throw new Error('Not implemented');
  }

  public getLatestCommit(): Promise<CommitMetadata> {
    throw new Error('Not implemented');
  }
}
