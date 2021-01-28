export type CmdOptions = Partial<AllCmdOptions>;

export interface AllCmdOptions {
  cwd:string;
  env:{ [name:string]:string | number };
  params:string[];
  useTempDir:boolean;
  maxBuffer?: number 
}
