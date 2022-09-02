import { MovedFilePathsMap } from '../../../DesignSystemSnapshot';
import { AbstractRepositoryAdapter } from '../AbstractRepositoryAdapter';
import { CommitMetadata, RepositoryAdapter, RepositoryAdapterOptions } from '../RepositoryAdapter';
import { getCurrentBranch } from './util/getCurrentBranch';
import { getLatestCommit } from './util/getLatestCommit';
import { getMovedFiles } from './util/getMovedFiles';

export class GitRepositoryAdapter extends AbstractRepositoryAdapter implements RepositoryAdapter {
  private readonly path: string;
  private readonly branchOverride: string | undefined;

  constructor(options: RepositoryAdapterOptions) {
    super();

    this.path = options.path;
    this.branchOverride = options.branchOverride;
  }

  public async getCurrentBranch(): Promise<string> {
    return getCurrentBranch(this.path, this.branchOverride);
  }

  public async getMovedFiles(revision1: string, revision2: string): Promise<MovedFilePathsMap> {
    return getMovedFiles(this.path, revision1, revision2);
  }

  public async getLatestCommit(): Promise<CommitMetadata> {
    return getLatestCommit(this.path);
  }
}
