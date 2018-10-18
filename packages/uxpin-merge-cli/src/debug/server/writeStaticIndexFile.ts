import { join, relative } from 'path';

import { ComponentDefinition } from '../../steps/serialization/component/ComponentDefinition';
import { writeToFile } from '../../utils/fs/writeToFile';

export async function writeStaticIndexFile(
  root:string,
  bundlePath:string,
  components:ComponentDefinition[],
):Promise<string> {
  const indexPath:string = join(root, 'index.html');
  const relativeBundlePath:string = relative(root, bundlePath);
  const fileContent:string = getIndexFileContent(relativeBundlePath, { components }, 'Design System styleguide');

  await writeToFile(indexPath, fileContent);
  return indexPath;
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
    <script src="${bundlePath}"></script>
  </body>
</html>`;
}
