export interface Commit {
  author:string;
  date:string;
  hash:string;
  message:string;
}

export interface VersionControlSystem {
  getCurrentBranch():Promise<string>;
  getLatestCommit():Promise<Commit>;
}

export interface VersionControlSystemOptions {
  path:string;
}
