import { copy } from 'fs-extra';
import { dir, DirectoryResult } from 'tmp-promise';
import { execAsync } from '../../../src/utils/child_process/execAsync';

export interface GitOptions {
  branch: string;
  initialise: boolean;
}

const defaultGitOptions: GitOptions = {
  branch: 'master',
  initialise: false,
};

export async function prepareTempDir(
  sourceDir: string,
  gitOptions: Partial<GitOptions> = {}
): Promise<DirectoryResult> {
  const { branch, initialise } = { ...defaultGitOptions, ...gitOptions };
  const result: DirectoryResult = await dir({ unsafeCleanup: true });
  await copy(sourceDir, result.path, { errorOnExist: true });

  if (initialise) {
    const gitCommands: string[] = [
      'git init',
      `git checkout -b ${branch}`,
      'git add .',
      'git config user.name test',
      'git config user.email test@test.dev',
      'git commit -m "Test"',
    ];

    await execAsync(gitCommands.join(' && '), { cwd: result.path });
  }

  return result;
}
