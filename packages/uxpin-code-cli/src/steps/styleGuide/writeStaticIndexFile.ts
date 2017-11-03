import { writeFile } from 'fs';
import { join, relative } from 'path';

import { ComponentDefinition } from '../serialization/component/ComponentDefinition';

export function writeStaticIndexFile(root:string, bundlePath:string, components:ComponentDefinition[]):Promise<string> {
  return new Promise((resolve, reject) => {
    const indexPath:string = join(root, 'index.html');
    const relativeBundlePath:string = relative(root, bundlePath);
    const fileContent:string = getIndexFileContent(relativeBundlePath, { components }, 'Design System styleguide');

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
