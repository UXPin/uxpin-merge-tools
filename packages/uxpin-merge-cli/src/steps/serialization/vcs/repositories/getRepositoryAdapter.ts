import { BuildOptions } from '../../../building/BuildOptions';
import { GitRepositoryAdapter } from './git/GitRepositoryAdapter';
import { ProvidedRepositoryAdapter } from './provided/ProvidedRepositoryAdapter';
import { isGitRepository } from './git/util/isGitRepository';
import { RepositoryAdapter, RepositoryAdapterOptions } from './RepositoryAdapter';

export async function getRepositoryAdapter(cwd: string, buildOptions?: BuildOptions): Promise<RepositoryAdapter> {
  // A caller that knows the revision (a server serializing a project it holds
  // in memory, a CI job building an unpacked tarball) names it, and nothing
  // has to be a working copy for the snapshot to have one.
  if (buildOptions && buildOptions.revision) {
    return new ProvidedRepositoryAdapter(buildOptions.revision);
  }

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
