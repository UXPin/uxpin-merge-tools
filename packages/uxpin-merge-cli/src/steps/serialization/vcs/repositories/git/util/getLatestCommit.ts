import { ExecOptions } from 'child_process';
import { execAsync } from '../../../../../../utils/child_process/execAsync';
import { CommitMetadata } from '../../RepositoryAdapter';

function removeNewLines(data:string):string {
  return data.replace(/\n/gm, '');
}

export async function getLatestCommit(cwd:string):Promise<CommitMetadata> {
  const options:ExecOptions = { cwd };

  const author:string = removeNewLines(await execAsync('git log -n 1 --pretty=format:\'%an\'', options));
  const date:string = removeNewLines(await execAsync('git log -n 1 --pretty=format:\'%cD\'', options));
  const hash:string = removeNewLines(await execAsync('git rev-parse HEAD', options));
  const message:string = removeNewLines(await execAsync('git log -n 1 --pretty=format:\'%s\'', options));

  return {
    author,
    date,
    hash,
    message,
  };
}
