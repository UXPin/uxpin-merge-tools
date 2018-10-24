import terminate = require('terminate');

export function terminateProcess(pid:number):Promise<void> {
  return new Promise((resolve, reject) => {
    terminate(pid, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}
