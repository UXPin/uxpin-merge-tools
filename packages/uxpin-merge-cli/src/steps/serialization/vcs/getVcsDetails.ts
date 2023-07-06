import debug from 'debug';
import { getApiDomain } from '../../../common/services/UXPin/getApiDomain';
import { getLatestCommitHash } from '../../../common/services/UXPin/getLatestCommitHash';
import { BuildOptions } from '../../../steps/building/BuildOptions';
import { ProjectPaths } from '../../../steps/discovery/paths/ProjectPaths';
import { ComponentCategory } from '../component/categories/ComponentCategory';
import { MovedFilePathsMap, VCSDetails } from '../DesignSystemSnapshot';
import { filterMovedFiles } from './filterMovedFiles';
import { getRepositoryAdapter } from './repositories/getRepositoryAdapter';
import { RepositoryAdapter, RepositoryPointer } from './repositories/RepositoryAdapter';
import { Command } from '../../../program/command/Command';

const log = debug('uxpin');

export async function getVcsDetails(
  paths: ProjectPaths,
  buildOptions: BuildOptions,
  categorizedComponents: ComponentCategory[]
): Promise<VCSDetails> {
  const repositoryAdapter: RepositoryAdapter = await getRepositoryAdapter(paths.projectRoot, buildOptions);
  const repositoryPointer: RepositoryPointer = await repositoryAdapter.getRepositoryPointer();
  const shouldGetLatestCommitHash = !buildOptions.force && ![Command.DELETE_VERSION].includes(buildOptions.command);
  let latestCommitHash: string | null = null;

  if (buildOptions.token && shouldGetLatestCommitHash) {
    log(`Fetch latest commit hash`);
    latestCommitHash = await getLatestCommitHash(
      getApiDomain(buildOptions.uxpinApiDomain!),
      repositoryPointer.branchName,
      buildOptions.token
    );
  }

  const vcs: VCSDetails = {
    branchName: repositoryPointer.branchName,
    commitHash: repositoryPointer.commit.hash,
    paths,
  };

  log(`Latest commit`, vcs.branchName, vcs.commitHash);

  if (latestCommitHash) {
    const movedFiles: MovedFilePathsMap = await repositoryAdapter.getMovedFiles(
      latestCommitHash,
      repositoryPointer.commit.hash
    );

    vcs.movedObjects = {
      components: filterMovedFiles(movedFiles, categorizedComponents),
      diffSourceCommitHash: latestCommitHash,
    };
    if (Object.keys(movedFiles).length) log(`Moved files`, Object.keys(movedFiles).length);
  }

  return vcs;
}
