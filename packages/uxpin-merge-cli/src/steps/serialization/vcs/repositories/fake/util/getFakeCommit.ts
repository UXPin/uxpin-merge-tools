import { createHash } from 'crypto';
import { CommitMetadata } from '../../RepositoryAdapter';

export async function getFakeCommit(): Promise<CommitMetadata> {
  return {
    author: '',
    date: '',
    hash: createHash('sha1')
      .update(String(+new Date()))
      .digest('hex'),
    message: '',
  };
}
