import { MovedFilePathsMap } from '../../steps/serialization/DesignSystemSnapshot';
import { AbstractRepositoryAdapter } from '../AbstractRepositoryAdapter';
import { CommitMetadata, RepositoryAdapter, RepositoryAdapterOptions } from '../RepositoryAdapter';
import { getCurrentBranch } from './util/getCurrentBranch';
import { getLatestCommit } from './util/getLatestCommit';
import { getMovedFiles } from './util/getMovedFiles';

export class GitRepositoryAdapter extends AbstractRepositoryAdapter implements RepositoryAdapter {
  private readonly path:string;

  constructor(options:RepositoryAdapterOptions) {
    super();

    this.path = options.path;
  }

  public async getCurrentBranch():Promise<string> {
    return getCurrentBranch(this.path);
  }

  public async getMovedFiles(r1:string, r2:string):Promise<MovedFilePathsMap> {
    return getMovedFiles(this.path, r1, r2);
  }

  public async getLatestCommit():Promise<CommitMetadata> {
    return getLatestCommit(this.path);
  }
}
