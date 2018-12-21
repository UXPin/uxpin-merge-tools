import { Commit, VersionControlSystem, VersionControlSystemOptions } from '../VersionControlSystem';
import { getCurrentBranch } from './util/getCurrentBranch';
import { getLatestCommit } from './util/getLatestCommit';

export class Git implements VersionControlSystem {
  private readonly path:string;

  constructor(options:VersionControlSystemOptions) {
    this.path = options.path;
  }

  public async getCurrentBranch():Promise<string> {
    return getCurrentBranch(this.path);
  }

  public async getLatestCommit():Promise<Commit> {
    return getLatestCommit(this.path);
  }
}
