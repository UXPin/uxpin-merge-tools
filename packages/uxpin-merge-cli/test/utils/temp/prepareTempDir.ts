import { copy } from 'fs-extra';
import { dir, DirectoryResult } from 'tmp-promise';
import { execAsync } from '../../../src/utils/child_process/execAsync';

export async function prepareTempDir(sourceDir:string, initialiseGit:boolean = false):Promise<DirectoryResult> {
  const result:DirectoryResult = await dir({ unsafeCleanup: true });
  await copy(sourceDir, result.path, { errorOnExist: true });

  if (initialiseGit) {
    const gitCommands:string[] = [
      'git init',
      'git add .',
      'git config user.name test',
      'git config user.email test@test.dev',
      'git commit -m "Test"',
    ];

    await execAsync(gitCommands.join(' && '), { cwd: result.path });
  }

  return result;
}
