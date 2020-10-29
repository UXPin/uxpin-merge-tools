import { DEFAULT_BRANCH_NAME } from '../../../../../../common/constants';
// import { execAsync } from '../../../../../../utils/child_process/execAsync';

export async function getCurrentBranch(cwd:string, override?:string):Promise<string> {
  // Use branch override if one is provided
  const branch:string|undefined = override;

  // If branch is not already provided, source from shell
  if (!branch) {
    return DEFAULT_BRANCH_NAME;
  }

  return branch.replace(/\s/g, '');
}
