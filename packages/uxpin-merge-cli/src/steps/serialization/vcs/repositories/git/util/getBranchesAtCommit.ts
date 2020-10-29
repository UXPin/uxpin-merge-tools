import { SHORT_COMMIT_HASH_IDX } from '../../../../../../common/constants';
import { execAsync } from '../../../../../../utils/child_process/execAsync';

export async function getBranchesAtCommit(cwd:string, fullCommitHash:string):Promise<string[]> {
  let branches:string[] = [];
  const currentShortHash:string = fullCommitHash.substring(0, SHORT_COMMIT_HASH_IDX);

  const rawReflogOutput:string = await execAsync('git reflog --all', { cwd });
  branches = rawReflogOutput
    .split('\n')
  // Filter out remotes, HEAD, the commit in question, and keep only top-level current commits
    .filter((l) => !l.includes('remotes') && !l.includes('HEAD') && !l.includes(fullCommitHash) && l.includes('@{0}'))
  // Filter out lines that do not contain
    .filter((l) => l.includes(currentShortHash))
  // Convert the line to a structured object
    .map((l) => {
      // tslint:disable-next-line:no-unused-variable
      const [shortCommitHash, ref, ...rest] = l.split(/\s+/);
      return ref.replace('refs/heads/', '').replace('@{0}:', '');
    });

  return branches;
}
