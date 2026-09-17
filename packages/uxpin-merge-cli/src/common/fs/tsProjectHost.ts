import * as ts from 'typescript';
import { join } from 'path';
import { getVirtualProject, resolveProjectPath } from './projectFs';

/**
 * A TypeScript compiler host for a project held in memory.
 *
 * The component files come from the volume; lib.d.ts, node_modules types and
 * everything else the program pulls in still come from disk, so the props of
 * a component typed against React are serialized exactly as they are when the
 * same project sits in a directory.
 *
 * Returns undefined when there is no virtual project in scope, and then the
 * caller lets TypeScript use its own host.
 */
export function createVirtualCompilerHost(options: ts.CompilerOptions): ts.CompilerHost | undefined {
  const project = getVirtualProject();
  if (!project) {
    return undefined;
  }
  const { volume, packagesRoot, root } = project;

  // `options` is the object the program is built with, and the resolution
  // below has to be the resolution it uses, so it is adjusted in place.
  if (packagesRoot) {
    // The project has no node_modules of its own; without this every import
    // of React resolves to nothing and every prop typed against it is `any`.
    // The project's own aliases come first and keep their meaning: what is
    // added is the fallback for everything they do not name.
    const packages: string = join(packagesRoot, 'node_modules', '*');
    options.paths = { ...options.paths, '*': [...(options.paths?.['*'] ?? []), packages] };
    options.typeRoots = [join(packagesRoot, 'node_modules', '@types')];
  }
  // Aliases are written relative to the project, as they are in its tsconfig.
  options.baseUrl = options.baseUrl ? resolveProjectPath(options.baseUrl) : root;

  const host: ts.CompilerHost = ts.createCompilerHost(options, true);
  const fromVolume = (fileName: string): string | undefined => {
    const path: string = resolveProjectPath(fileName);
    return volume.existsSync(path) ? (volume.readFileSync(path, 'utf8') as string) : undefined;
  };
  // Component paths arrive relative to the project root, as they do for the
  // CLI, whose working directory that is.
  host.getCurrentDirectory = () => root;

  const readFile = host.readFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const getSourceFile = host.getSourceFile.bind(host);
  const directoryExists = host.directoryExists?.bind(host);
  const getDirectories = host.getDirectories?.bind(host);
  const realpath = host.realpath?.bind(host);

  host.readFile = (fileName) => fromVolume(fileName) ?? readFile(fileName);
  host.fileExists = (fileName) => volume.existsSync(resolveProjectPath(fileName)) || fileExists(fileName);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const virtual = fromVolume(fileName);
    return virtual === undefined
      ? getSourceFile(fileName, languageVersion, onError, shouldCreate)
      : ts.createSourceFile(fileName, virtual, languageVersion, true);
  };

  // Resolving `import { Props } from '../types/Props'` starts by asking
  // whether ../types is a directory, and stops there when the answer is no:
  // read off the real disk, a project in memory could not import a file of
  // its own, and every prop typed in another file came back missing.
  host.directoryExists = (directoryName) =>
    isVolumeDirectory(directoryName) || (directoryExists ? directoryExists(directoryName) : false);
  host.getDirectories = (directoryName) =>
    isVolumeDirectory(directoryName) ? volumeDirectories(directoryName) : getDirectories?.(directoryName) ?? [];
  // A path in memory is already the real one; symlinks are a disk's business.
  host.realpath = (path) => (volume.existsSync(resolveProjectPath(path)) ? path : realpath?.(path) ?? path);

  function isVolumeDirectory(directoryName: string): boolean {
    const path: string = resolveProjectPath(directoryName);
    return volume.existsSync(path) && volume.statSync(path).isDirectory();
  }

  function volumeDirectories(directoryName: string): string[] {
    const path: string = resolveProjectPath(directoryName);
    return (volume.readdirSync(path) as string[]).filter((entry) => volume.statSync(join(path, entry)).isDirectory());
  }

  return host;
}
