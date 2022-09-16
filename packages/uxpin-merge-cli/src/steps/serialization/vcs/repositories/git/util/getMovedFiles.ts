import { ExecOptions } from 'child_process';
import { forEach } from 'lodash';
import { execAsync } from '../../../../../../utils/child_process/execAsync';
import { MovedFilePathsMap } from '../../../../DesignSystemSnapshot';
import { isCommit } from './isCommit';

const SIMILARITY_INDEX = 50;

interface RevisionsMap {
  [revision: string]: boolean;
}

export async function getMovedFiles(cwd: string, revision1: string, revision2: string): Promise<MovedFilePathsMap> {
  const revs: RevisionsMap = {
    [`${revision1}`]: await isCommit(cwd, revision1),
    [`${revision2}`]: await isCommit(cwd, revision2),
  };

  forEach(revs, (isValidCommit, revision) => {
    if (!isValidCommit) {
      throw new Error(`🛑 Unable to find revision ${revision} on your git. Please check the following.
          • Override push of DS from different repository is not supported. Please reach out to support if necessary.
          • If using shallow clone then clone depth must be changed as well.
          • Make sure repository is up-to-date 👉 pull latest changes from remote git. A team member may have pushed
            new changes to UXPin.
      `);
    }
  });

  try {
    const options: ExecOptions = { cwd };
    const diff: string = await execAsync(
      `git diff ${revision1}...${revision2} --diff-filter=R --name-status -M${SIMILARITY_INDEX}%`,
      options
    );

    const files: MovedFilePathsMap = diff
      .split('\n')
      .filter(Boolean)
      .reduce((pathsMap: MovedFilePathsMap, line: string) => {
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
