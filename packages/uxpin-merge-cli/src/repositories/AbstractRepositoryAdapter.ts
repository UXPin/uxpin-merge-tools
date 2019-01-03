import { RepositoryAdapter, RepositoryPointer, CommitMetadata } from './RepositoryAdapter';

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

  public getLatestCommit():Promise<CommitMetadata> {
    throw new Error('Not implemented');
  }
}
