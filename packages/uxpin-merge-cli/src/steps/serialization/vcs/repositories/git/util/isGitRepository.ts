import debug from 'debug';

import { execAsync } from '../../../../../../utils/child_process/execAsync';

const log = debug('uxpin');

export async function isGitRepository(cwd: string): Promise<boolean> {
  try {
    log('Git repository check');
    await execAsync('git status', { cwd });
    return true;
  } catch (error) {
    log((error as Error).message);
    return false;
  }
}
