export type CmdOptions = Partial<AllCmdOptions>;

export interface AllCmdOptions {
  params:string[];
  cwd:string;
  env:{ [name:string]:string | number };
}
