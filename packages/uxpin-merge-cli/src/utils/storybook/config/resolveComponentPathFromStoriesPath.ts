import { readdirSync } from 'fs-extra';
import { basename, dirname, relative, resolve } from 'path';

// Retrun relative path to the component from cwd
export function resolveComponentPathFromStoriesPath(
  cwd:string, componentPath:string, storiesPath:string):string | null {

  const absoluteCompoentPath:string = resolve(dirname(storiesPath), componentPath);
  const componentDir:string = dirname(absoluteCompoentPath);
  const baseName:string = basename(absoluteCompoentPath);
  const files:string[] = readdirSync(componentDir);

  const fileNameWithExtention:string | undefined = files.find((file:string) => {
    const reg:RegExp = new RegExp(`${baseName}.(ts|tsx|js|jsx)`);
    return file.match(reg) !== null;
  });

  if (!fileNameWithExtention) {
    return null;
  }

  return relative(cwd, resolve(componentDir, fileNameWithExtention));
}
