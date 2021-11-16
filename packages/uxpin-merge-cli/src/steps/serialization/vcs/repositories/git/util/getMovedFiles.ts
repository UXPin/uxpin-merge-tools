import { ExecOptions } from 'child_process';
import { forEach } from 'lodash';
import { execAsync } from '../../../../../../utils/child_process/execAsync';
import { MovedFilePathsMap } from '../../../../DesignSystemSnapshot';
import { isCommit } from './isCommit';

const SIMILARITY_INDEX:number = 50;

interface RevisionsMap {
  [revision:string]:boolean;
}

export async function getMovedFiles(cwd:string, revision1:string, revision2:string):Promise<MovedFilePathsMap> {
  const revs:RevisionsMap = {
    [`${revision1}`]: await isCommit(cwd, revision1),
    [`${revision2}`]: await isCommit(cwd, revision2),
  };

  forEach(revs, (isValidCommit, revision) => {
    if (!isValidCommit) {
      throw new Error(`🛑 The last pushed commit to library: ${revision} cannot be found. The current HEAD may be different.   `);
    }
  });

  try {
    const options:ExecOptions = { cwd };
    const diff:string = await execAsync(
      `git diff ${revision1}...${revision2} --diff-filter=R --name-status -M${SIMILARITY_INDEX}%`,
      options,
    );

    const files:MovedFilePathsMap = diff.split('\n')
      .filter(Boolean)
      .reduce((pathsMap:MovedFilePathsMap, line:string) => {
        const [, sourcePath, newPath] = line.split('\t');

        return {
          ...pathsMap,
          [sourcePath]: newPath,
        };
      }, {});

    return files;
  } catch (error) {
    return Promise.reject(error);
  }
}
