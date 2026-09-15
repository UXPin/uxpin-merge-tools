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

  if (packagesRoot) {
    // The project has no node_modules of its own; without this every import
    // of React resolves to nothing and every prop typed against it is `any`.
    options.baseUrl = options.baseUrl ?? '/';
    options.paths = options.paths ?? { '*': [join(packagesRoot, 'node_modules', '*')] };
    options.typeRoots = [join(packagesRoot, 'node_modules', '@types')];
  }

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

  host.readFile = (fileName) => fromVolume(fileName) ?? readFile(fileName);
  host.fileExists = (fileName) => volume.existsSync(resolveProjectPath(fileName)) || fileExists(fileName);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) => {
    const virtual = fromVolume(fileName);
    return virtual === undefined
      ? getSourceFile(fileName, languageVersion, onError, shouldCreate)
      : ts.createSourceFile(fileName, virtual, languageVersion, true);
  };

  return host;
}
