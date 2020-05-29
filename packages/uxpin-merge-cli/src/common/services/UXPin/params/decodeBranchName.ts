export function decodeBranchName(encodedBranchName:string):string {
  if (!encodedBranchName.includes(':')) {
    return encodedBranchName;
  }

  return decodeURIComponent(encodedBranchName.split(':').join('%'));
}
