import { ExecOptions } from 'child_process';
import { execAsync } from '../../../../../../utils/child_process/execAsync';
import { MovedFilePathsMap } from '../../../../DesignSystemSnapshot';

export async function getMovedFiles(cwd:string, revision1:string, revision2:string):Promise<MovedFilePathsMap> {
  const options:ExecOptions = { cwd };
  const diff:string = await execAsync(
    `git diff ${revision1}...${revision2} --diff-filter=R --name-status -M99%`,
    options,
  );

  const files:MovedFilePathsMap = diff.split('\n')
    .filter((line) => line !== '')
    .reduce((pathsMap:MovedFilePathsMap, line:string) => {
      const [, sourcePath, newPath] = line.split('\t');

      return {
        ...pathsMap,
        [sourcePath]: newPath,
      };
    }, {});

  return files;
}
