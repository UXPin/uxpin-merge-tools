import { AsyncLocalStorage } from 'async_hooks';
import { isAbsolute, join } from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import globby = require('globby');
import { createFsFromVolume, Volume } from 'memfs';

/** memfs exports the class, not the instance type. */
type ProjectVolume = InstanceType<typeof Volume>;

/**
 * Where the project being serialized is read from.
 *
 * The CLI reads a directory, and that is still the default: with no virtual
 * project in scope every function here is the `fs-extra` one it replaced. A
 * caller that holds the project in memory instead (a server publishing a
 * library it never wrote to disk) runs the serialization inside
 * `runOnVirtualProject`, and the same code paths read from the volume.
 *
 * Only the project's own files live in the volume. node_modules, the
 * TypeScript lib files and the CLI's own resources stay on the real disk, so
 * every read falls through to `fs` when the volume does not have the path.
 */
export interface VirtualProject {
  volume: ProjectVolume;
  /**
   * Where the project is mounted. The CLI runs with the project root as its
   * working directory and passes component paths around relative to it, so a
   * virtual project resolves those the same way instead of against the
   * process's own directory.
   */
  root: string;
  /**
   * The volume behind an `fs`-shaped facade with its methods bound. Tools that
   * take a filesystem (fast-glob, webpack) copy the methods off the object
   * they are handed, and unbound volume methods lose their `this` and quietly
   * find nothing.
   */
  fs: any;
  /**
   * A real directory holding the node_modules the project's imports resolve
   * against. A virtual project carries no packages of its own, and both the
   * preset bundle and the TypeScript program need React to be findable.
   */
  packagesRoot?: string;
}

const storage = new AsyncLocalStorage<VirtualProject>();

/** The files of one project, keyed by absolute path. */
export function createVirtualProject(
  files: Array<{ path: string; content: string }>,
  root: string,
  packagesRoot?: string
): VirtualProject {
  const volume = new Volume();
  for (const file of files) {
    volume.mkdirSync(dirname(file.path), { recursive: true });
    volume.writeFileSync(file.path, file.content);
  }
  return { fs: createFsFromVolume(volume), packagesRoot, root, volume };
}

/** A path as the volume holds it: relative ones belong to the project root. */
export function resolveProjectPath(path: string): string {
  const project = storage.getStore();
  if (!project || isAbsolute(path)) {
    return path;
  }
  return join(project.root, path);
}

/** Runs `serialize` with the project read from memory instead of from disk. */
export function runOnVirtualProject<T>(project: VirtualProject, serialize: () => Promise<T>): Promise<T> {
  return storage.run(project, serialize);
}

/** The volume in scope, when the project being read is a virtual one. */
export function getProjectVolume(): ProjectVolume | undefined {
  return storage.getStore()?.volume;
}

/** The virtual project in scope, if any. */
export function getVirtualProject(): VirtualProject | undefined {
  return storage.getStore();
}

function dirname(path: string): string {
  const cut = path.lastIndexOf('/');
  return cut <= 0 ? '/' : path.slice(0, cut);
}

function virtualHas(path: string): ProjectVolume | undefined {
  const volume = getProjectVolume();
  return volume && volume.existsSync(resolveProjectPath(path)) ? volume : undefined;
}

export async function readFile(path: string, options: { encoding: 'utf8' } = { encoding: 'utf8' }): Promise<string> {
  const volume = virtualHas(path);
  if (volume) {
    return volume.readFileSync(resolveProjectPath(path), options.encoding) as string;
  }
  return fsExtra.readFile(path, options);
}

export function readFileSync(path: string, options: { encoding: 'utf8' } = { encoding: 'utf8' }): string {
  const volume = virtualHas(path);
  if (volume) {
    return volume.readFileSync(resolveProjectPath(path), options.encoding) as string;
  }
  return fsExtra.readFileSync(path, options);
}

export async function readJson(path: string): Promise<any> {
  const volume = virtualHas(path);
  if (volume) {
    return JSON.parse(volume.readFileSync(resolveProjectPath(path), 'utf8') as string);
  }
  return fsExtra.readJSON(path);
}

export async function pathExists(path: string): Promise<boolean> {
  if (virtualHas(path)) {
    return true;
  }
  return getProjectVolume() ? false : fsExtra.pathExists(path);
}

export function existsSync(path: string): boolean {
  if (virtualHas(path)) {
    return true;
  }
  return getProjectVolume() ? false : fs.existsSync(path);
}

export async function readdir(path: string): Promise<string[]> {
  const volume = getProjectVolume();
  if (volume) {
    return volume.readdirSync(resolveProjectPath(path)) as string[];
  }
  return fsExtra.readdir(path);
}

export async function ensureDir(path: string): Promise<void> {
  const volume = getProjectVolume();
  if (volume) {
    volume.mkdirSync(resolveProjectPath(path), { recursive: true });
    return;
  }
  await fsExtra.ensureDir(path);
}

export async function writeFile(path: string, content: string): Promise<void> {
  const volume = getProjectVolume();
  if (volume) {
    const target = resolveProjectPath(path);
    volume.mkdirSync(dirname(target), { recursive: true });
    volume.writeFileSync(target, content);
    return;
  }
  await fsExtra.writeFile(path, content);
}

export async function remove(path: string): Promise<void> {
  const volume = getProjectVolume();
  if (volume) {
    const target = resolveProjectPath(path);
    if (volume.existsSync(target)) {
      volume.unlinkSync(target);
    }
    return;
  }
  await fsExtra.unlink(path);
}

/**
 * The project's files matching the patterns. fast-glob, which globby runs on,
 * walks whatever filesystem it is handed, so the virtual project is globbed
 * by the same call that globs a directory.
 */
export async function glob(patterns: string | string[], options: { cwd: string }): Promise<string[]> {
  const project = getVirtualProject();
  if (project) {
    return globby(patterns, { ...options, fs: project.fs });
  }
  return globby(patterns, options);
}
