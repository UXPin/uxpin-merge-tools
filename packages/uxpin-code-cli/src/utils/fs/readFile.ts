import fsReadfilePromise = require('fs-readfile-promise');

export function readFile(filename:string, options:{ encoding:null; flag?:string; }):Promise<Buffer>;
export function readFile(filename:string, options:{ encoding:string; flag?:string; }):Promise<string>;
export function readFile(filename:string, options:{ encoding:string | null; flag?:string; }):Promise<string | Buffer> {
  return fsReadfilePromise(filename, options);
}
