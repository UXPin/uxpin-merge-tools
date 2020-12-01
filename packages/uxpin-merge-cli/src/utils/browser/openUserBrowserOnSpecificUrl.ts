import open = require('open');

export async function openUserBrowserOnSpecificUrl(url:string):Promise<void> {
  // Using the url option handles errors in Windows/WSL
  // in which ^ characters are being inserted:
  // https://github.com/UXPin/uxpin-merge-tools/issues/218
  await open(url, { url: true });
}
