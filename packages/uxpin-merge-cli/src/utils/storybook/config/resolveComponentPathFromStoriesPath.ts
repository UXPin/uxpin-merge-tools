import { readdirSync } from 'fs-extra';
import { basename, dirname, relative, resolve } from 'path';

// Return relative path to the component from cwd
export function resolveComponentPathFromStoriesPath(
  cwd:string, componentPath:string, storiesPath:string):string | null {

  const absoluteComponentPath:string = resolve(dirname(storiesPath), componentPath);
  const componentDir:string = dirname(absoluteComponentPath);
  const baseName:string = basename(absoluteComponentPath);
  const files:string[] = readdirSync(componentDir);

  const fileNameWithExtension:string | undefined = files.find((file:string) => {
    const reg:RegExp = new RegExp(`${baseName}.(ts|tsx|js|jsx)`);
    return file.match(reg) !== null;
  });

  if (fileNameWithExtension) {
    return relative(cwd, resolve(componentDir, fileNameWithExtension));
  }

  // @todo - handle component exported via index.(js|ts)
  // by finding component file path from index.(js|ts) with `acorn-loose`
  return null;
}
