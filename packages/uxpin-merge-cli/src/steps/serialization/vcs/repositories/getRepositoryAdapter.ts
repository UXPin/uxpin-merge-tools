import { BuildOptions } from '../../../building/BuildOptions';
import { GitRepositoryAdapter } from './git/GitRepositoryAdapter';
import { isGitRepository } from './git/util/isGitRepository';
import { RepositoryAdapter, RepositoryAdapterOptions } from './RepositoryAdapter';

export async function getRepositoryAdapter(cwd: string, buildOptions?: BuildOptions): Promise<RepositoryAdapter> {
  const options: RepositoryAdapterOptions = { path: cwd };

  // Use branch for override if provided
  if (buildOptions && buildOptions.branch) {
    options.branchOverride = buildOptions.branch;
  }

  // Check and use Git repository
  if (await isGitRepository(cwd)) {
    return new GitRepositoryAdapter(options);
  }

  throw new Error('Could not determine version control system for your repository!');
}
