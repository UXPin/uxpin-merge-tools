import fsReaddirPromise = require('fs-readdir-promise');
import { parse } from 'path';

export function isFileCaseSensitive(path:string):Promise<void> {
  const { dir, base } = parse(path);
  return fsReaddirPromise(dir).then((contents) => {
    if (!contents.includes(base)) {
      throw new Error(`Exact path ${path} does not exist`);
    }
  });
}
