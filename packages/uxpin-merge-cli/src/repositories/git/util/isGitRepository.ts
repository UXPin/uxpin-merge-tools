import { execAsync } from '../../../utils/child_process/execAsync';

export async function isGitRepository(cwd:string):Promise<boolean> {
  try {
    await execAsync('git status', { cwd });
    return true;
  } catch (e) {
    return false;
  }
}
