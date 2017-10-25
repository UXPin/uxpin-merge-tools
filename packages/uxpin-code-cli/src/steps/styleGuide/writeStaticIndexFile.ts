import { writeFile } from 'fs';
import { TEMP_DIR_PATH } from '../building/config/getConfig';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';

export function writeStaticIndexFile(bundlePath:string, components:ComponentDefinition[]):Promise<string> {
  return new Promise((resolve, reject) => {
    const indexPath:string = `${TEMP_DIR_PATH}/index.html`;
    const fileContent:string = getIndexFileContent(bundlePath,{ components }, 'Design System styleguide');

    writeFile(indexPath, fileContent, 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve(indexPath);
    });
  });
}

function getIndexFileContent(bundlePath:string, preloadedState:{}, title:string = ''):string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <script src="require1k.min.js"></script>
  </head>
  <body style="font-family: sans-serif">
    <div id="root"></div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
    <script src=${bundlePath}></script>
  </body>
</html>`;
}
