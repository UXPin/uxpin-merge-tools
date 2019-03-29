import { connect } from 'ngrok';

export async function connectAsync(port:number):Promise<string> {
  return new Promise<string>((resolve, reject) => {
    connect(port, (err, url) => {
      if (err) {
        reject(err);

        return;
      }

      resolve(url);
    });
  });
}
