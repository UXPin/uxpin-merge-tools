import { CommitMetadata, RepositoryAdapter, RepositoryAdapterOptions } from '../RepositoryAdapter';
import { getCurrentBranch } from './util/getCurrentBranch';
import { getLatestCommit } from './util/getLatestCommit';

export class GitRepositoryAdapter implements RepositoryAdapter {
  private readonly path:string;

  constructor(options:RepositoryAdapterOptions) {
    this.path = options.path;
  }

  public async getCurrentBranch():Promise<string> {
    return getCurrentBranch(this.path);
  }

  public async getLatestCommit():Promise<CommitMetadata> {
    return getLatestCommit(this.path);
  }
}
