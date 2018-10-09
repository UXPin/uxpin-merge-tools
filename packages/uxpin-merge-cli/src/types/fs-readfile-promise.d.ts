declare function readFile(filename:string, options:{ encoding:null; flag?:string; }):Promise<Buffer>;
declare function readFile(filename:string, options:{ encoding:string; flag?:string; }):Promise<string>;
declare function readFile(filename:string, options:{ encoding:string | null; flag?:string; }):Promise<string | Buffer>;

export = readFile;
