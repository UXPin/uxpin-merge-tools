export function encodeBranchName(branchName: string): string {
  return encodeURIComponent(branchName).split('%').join(':');
}
