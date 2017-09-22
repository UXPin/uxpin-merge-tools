import { readdir, stat } from 'fs';

export function getDirectoryContent(path:string):Promise<string[]> {
  return new Promise((resolve, reject) => {
    readdir(path, (err, fileNames) => {
      if (err) {
        return reject(err);
      }

      resolve(fileNames);
    });
  });
}

export function isDirectory(path:string):Promise<boolean> {
  return new Promise((resolve) => {
    stat(path, (error, stats) => {
      if (error) {
        return resolve(false);
      }

      resolve(stats.isDirectory());
    });
  });
}
