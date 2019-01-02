import { execAsync } from '../../../utils/child_process/execAsync';

export async function getCurrentBranch(cwd:string):Promise<string> {
  const branch:string = await execAsync('git rev-parse --abbrev-ref HEAD', { cwd });

  return branch.replace(/\s/g, '');
}
