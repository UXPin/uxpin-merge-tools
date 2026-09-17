import { MovedFilePathsMap } from '../../../DesignSystemSnapshot';
import { AbstractRepositoryAdapter } from '../AbstractRepositoryAdapter';
import { CommitMetadata } from '../RepositoryAdapter';

export interface ProvidedRevision {
  branchName: string;
  commitHash: string;
  author?: string;
  date?: string;
  message?: string;
}

/**
 * A revision the caller already knows.
 *
 * Git answers "what is this working copy" by reading .git. A project that
 * never was a working copy - a library serialized straight from a server, a
 * CI job building an unpacked tarball - has the same question answered by
 * whoever built the file set, so they name the revision and this adapter
 * repeats it.
 *
 * Nothing is diffed against a previous revision, so no file is reported as
 * moved: a mapping needs two revisions to compare, and this adapter has one.
 */
export class ProvidedRepositoryAdapter extends AbstractRepositoryAdapter {
  constructor(private readonly revision: ProvidedRevision) {
    super();
  }

  public async getCurrentBranch(): Promise<string> {
    return this.revision.branchName;
  }

  public async getLatestCommit(): Promise<CommitMetadata> {
    return {
      author: this.revision.author ?? '',
      date: this.revision.date ?? new Date().toISOString(),
      hash: this.revision.commitHash,
      message: this.revision.message ?? '',
    };
  }

  public async getMovedFiles(): Promise<MovedFilePathsMap> {
    return {};
  }
}
