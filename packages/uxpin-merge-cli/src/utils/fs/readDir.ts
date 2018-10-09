import fsReaddirPromise = require('fs-readdir-promise');

export const readDir:(dirPath:string) => Promise<string[]> = fsReaddirPromise;
