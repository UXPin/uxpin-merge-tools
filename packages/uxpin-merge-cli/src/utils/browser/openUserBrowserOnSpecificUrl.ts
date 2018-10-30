import opn = require('opn');

export async function openUserBrowserOnSpecificUrl(url:string):Promise<void> {
  await opn(url);
}
