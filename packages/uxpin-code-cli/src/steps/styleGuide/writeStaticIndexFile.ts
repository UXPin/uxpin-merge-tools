import { writeFile } from 'fs';
import { TEMP_DIR_PATH } from '../building/config/getConfig';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { App } from './App';
import { getHtmlString } from './getHtmlString';

export function writeStaticIndexFile(components:ComponentDefinition[]):Promise<string> {
  return new Promise((resolve, reject) => {
    const indexPath:string = `${TEMP_DIR_PATH}/index.html`;
    const fileContent:string = getIndexFileContent(getHtmlString(App, { components }), 'Design System styleguide');

    writeFile(indexPath, fileContent, 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve(indexPath);
    });
  });
}

function getIndexFileContent(content:string, title:string = ''):string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
  </head>
  <body style="font-family: sans-serif">
    <div id="root">${content}</div>
  </body>
</html>`;
}
