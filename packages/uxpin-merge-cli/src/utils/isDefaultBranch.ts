import { ALTERNATIVE_DEFAULT_BRANCH_NAME, DEFAULT_BRANCH_NAME } from '../common/constants';

export function isDefaultBranch(branchName: string) {
  return [DEFAULT_BRANCH_NAME, ALTERNATIVE_DEFAULT_BRANCH_NAME].includes(branchName);
}
