import { SHORT_COMMIT_HASH_IDX } from '../../../../../../common/constants';
import { execAsync } from '../../../../../../utils/child_process/execAsync';

const REMOTE_PREFIX_RGX:RegExp = /^refs\/remotes\/[^\/]+\//;

export async function getBranchesAtCommit(cwd:string, fullCommitHash:string):Promise<string[]> {
  const branches:Set<string> = new Set();
  const currentShortHash:string = fullCommitHash.substring(0, SHORT_COMMIT_HASH_IDX);

  const rawReflogOutput:string = await execAsync('git reflog --all', { cwd });
  rawReflogOutput
    .split('\n')
    // Filter out HEAD, the commit in question, and keep only top-level current commits
    .filter((l) => !l.includes('HEAD@') && l.includes('@{0}'))
    // Filter out lines that do not contain
    .filter((l) => l.includes(currentShortHash))
    // Convert the line to a structured object
    .forEach((l) => {
      // tslint:disable-next-line:no-unused-variable
      const [shortCommitHash, ref, ...rest] = l.split(/\s+/);
      const branchName:string = ref
        .replace('refs/heads/', '')
      // Remotes are left in because some platforms that do detached HEAD checkouts
      // have master present but only as a remote. It's
        .replace(REMOTE_PREFIX_RGX, '')
        .replace('@{0}:', '');

      branches.add(branchName);
    });

  return [...branches];
}
