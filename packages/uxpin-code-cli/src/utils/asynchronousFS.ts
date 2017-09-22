import { stat } from 'fs';

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
