import { MovedFilePathsMap } from '../../../DesignSystemSnapshot';
import { AbstractRepositoryAdapter } from '../AbstractRepositoryAdapter';
import { CommitMetadata, RepositoryAdapter } from '../RepositoryAdapter';
import { getFakeCommit } from './util/getFakeCommit';

export class FakeRepositoryAdapter extends AbstractRepositoryAdapter implements RepositoryAdapter {
  constructor() {
    super();
  }

  // tslint:disable-next-line:prefer-function-over-method
  public async getCurrentBranch(): Promise<string> {
    return 'master';
  }

  // tslint:disable-next-line:prefer-function-over-method
  public async getMovedFiles(): Promise<MovedFilePathsMap> {
    return {};
  }

  // tslint:disable-next-line:prefer-function-over-method
  public async getLatestCommit(): Promise<CommitMetadata> {
    return getFakeCommit();
  }
}
