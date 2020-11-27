import open = require('open');

export async function openUserBrowserOnSpecificUrl(url:string):Promise<void> {
  await open(url, { url: true });
}
