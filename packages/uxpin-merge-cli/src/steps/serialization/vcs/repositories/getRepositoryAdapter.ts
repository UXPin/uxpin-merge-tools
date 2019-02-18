import { GitRepositoryAdapter } from './git/GitRepositoryAdapter';
import { isGitRepository } from './git/util/isGitRepository';
import { RepositoryAdapter } from './RepositoryAdapter';

export async function getRepositoryAdapter(cwd:string):Promise<RepositoryAdapter> {
  if (await isGitRepository(cwd)) {
    return new GitRepositoryAdapter({ path: cwd });
  }

  throw new Error('Could not determine version control system for your repository!');
}
