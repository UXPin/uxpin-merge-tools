import { ExecOptions } from 'child_process';
import { MovedFilePathsMap } from '../../../steps/serialization/DesignSystemSnapshot';
import { execAsync } from '../../../utils/child_process/execAsync';

export async function getMovedFiles(cwd:string, r1:string, r2:string):Promise<MovedFilePathsMap> {
  const options:ExecOptions = { cwd };
  const diff:string = await execAsync(`git diff ${r1}...${r2} --diff-filter=R --name-status`, options);

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
