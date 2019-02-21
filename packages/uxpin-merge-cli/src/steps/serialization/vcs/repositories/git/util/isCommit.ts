import { ExecOptions } from 'child_process';
import { execAsync } from '../../../../../../utils/child_process/execAsync';
import { removeNewLines } from './removeNewLines';

const VALID_RESPONSE = 'commit';

export async function isCommit(cwd:string, revision:string):Promise<boolean> {
  const options:ExecOptions = { cwd };

  try {
    const result:string = removeNewLines(await execAsync(`git cat-file -t ${revision}`, options));

    return result === VALID_RESPONSE;
  } catch (error) {
    return false;
  }
}
