import { join, resolve } from 'path';
import { Warned } from '../common/warning/Warned';
import { createVirtualProject, runOnVirtualProject } from '../common/fs/projectFs';
import { Command } from '../program/command/Command';
import { ProgramArgs } from '../program/args/ProgramArgs';
import { ProjectPaths } from '../steps/discovery/paths/ProjectPaths';
import { DesignSystemSnapshot } from '../steps/serialization/DesignSystemSnapshot';
import { getDesignSystemMetadata } from '../steps/serialization/getDesignSystemMetadata';
import { ProvidedRevision } from '../steps/serialization/vcs/repositories/provided/ProvidedRepositoryAdapter';

const DEFAULT_CONFIG_FILE = 'uxpin.config.js';
/** Where a project that has no directory of its own is mounted. */
const VIRTUAL_PROJECT_ROOT = '/uxpin-merge-project';

export interface VirtualFile {
  /** Relative to the project root, as the config's patterns spell it. */
  path: string;
  content: string;
}

export interface DumpDesignSystemOptions {
  /**
   * The project, held in memory. Left out, the project is read from
   * `projectRoot` on disk, which is what the `dump` command does.
   */
  files?: VirtualFile[];
  /** Defaults to the current directory, or to a mount point for a virtual project. */
  projectRoot?: string;
  /** Defaults to uxpin.config.js under the project root. */
  configPath?: string;
  /**
   * The revision to file the snapshot under. Left out, it is read from git,
   * and the project has to be a working copy.
   */
  revision?: ProvidedRevision;
  /** A webpack config of the project, as the CLI's --webpack-config flag takes it. */
  webpackConfig?: string;
  /**
   * A real directory holding the node_modules the project's imports resolve
   * against. Required for a virtual project, which carries no packages: React
   * has to be findable for the presets to compile and for the props typed
   * against it to be serialized as anything but `any`.
   */
  packagesRoot?: string;
}

/**
 * The metadata of a design system: what `uxpin-merge dump` prints, returned to
 * a caller in the same process.
 *
 * The CLI serializes a directory that is a git working copy. Everything that
 * made those two things mandatory is now an option: the files can come from
 * memory, and the revision can be one the caller already knows. What reads
 * them is the same code either way, so a snapshot taken here is the snapshot
 * the CLI would have taken.
 */
export function dumpDesignSystem(options: DumpDesignSystemOptions = {}): Promise<Warned<DesignSystemSnapshot>> {
  const projectRoot: string = options.projectRoot ?? (options.files ? VIRTUAL_PROJECT_ROOT : resolve(process.cwd()));
  const paths: ProjectPaths = {
    configPath: options.configPath ?? join(projectRoot, DEFAULT_CONFIG_FILE),
    projectRoot,
  };
  const programArgs = {
    command: Command.DUMP,
    cwd: projectRoot,
    revision: options.revision,
    webpackConfig: options.webpackConfig,
  } as unknown as ProgramArgs;

  if (!options.files) {
    return getDesignSystemMetadata(programArgs, paths);
  }

  const project = createVirtualProject(
    options.files.map((file) => ({ content: file.content, path: join(projectRoot, file.path) })),
    projectRoot,
    options.packagesRoot
  );

  return runOnVirtualProject(project, () => getDesignSystemMetadata(programArgs, paths));
}
