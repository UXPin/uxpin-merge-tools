import { copy, ensureDir } from 'fs-extra';
import { resolve } from 'path';
import { dir, DirectoryResult } from 'tmp-promise';
import { execAsync } from '../../../src/utils/child_process/execAsync';

export interface GitOptions {
  branch:string;
  initialise:boolean;
}

const defaultGitOptions:GitOptions = {
  branch: 'master',
  initialise: false,
};

export async function prepareTempDir(
  sourceDir:string,
  gitOptions:Partial<GitOptions> = {},
  linkPackage:boolean = false,
  projectPath?:string,
):Promise<DirectoryResult> {
  const { branch, initialise } = { ...defaultGitOptions, ...gitOptions };
  const result:DirectoryResult = await dir({ unsafeCleanup: true });
  await copy(sourceDir, result.path, { errorOnExist: true });

  if (initialise) {
    const gitCommands:string[] = [
      'git init',
      `git checkout -b ${branch}`,
      'git add .',
      'git config user.name test',
      'git config user.email test@test.dev',
      'git commit -m "Test"',
    ];

    await execAsync(gitCommands.join(' && '), { cwd: result.path });
  }

  if (linkPackage && projectPath) {
    const projectSrc:string = resolve(projectPath, 'src');
    const projectDest:string = resolve(result.path, 'node_modules/@uxpin/merge-cli/src');

    await ensureDir(projectDest);
    await copy(projectSrc, projectDest);
  }

  return result;
}
