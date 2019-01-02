export interface CommitMetadata {
  author:string;
  date:string;
  hash:string;
  message:string;
}

export interface RepositoryAdapter {
  getCurrentBranch():Promise<string>;
  getLatestCommit():Promise<CommitMetadata>;
}

export interface RepositoryAdapterOptions {
  path:string;
}
