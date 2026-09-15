import { Volume } from 'memfs';

/** memfs exports the class, not the instance type. */
type ProjectVolume = InstanceType<typeof Volume>;
import * as vm from 'vm';

/**
 * Webpack reading a project that is not on disk.
 *
 * The presets bundle is compiled from the project's own files, which may live
 * in a volume, and from node_modules, which never does. So the input
 * filesystem asks the volume first and falls through to the real one for
 * everything it does not hold, and the output is written into memory and read
 * straight back.
 */
/**
 * The volume's files as modules for webpack.
 *
 * The compiler's own filesystem is left alone: webpack-virtual-modules
 * patches it while the compiler is being built, and swapping it afterwards
 * breaks the plugin. The project's files are handed to that same plugin
 * instead, so a file in memory is served exactly like the placeholder
 * component modules already are, and node_modules keep coming from disk.
 */
export function collectVolumeModules(volume: ProjectVolume): Record<string, string> {
  const modules: Record<string, string> = {};
  const contents: Record<string, string | null> = volume.toJSON() as Record<string, string | null>;
  for (const [path, content] of Object.entries(contents)) {
    if (typeof content === 'string') {
      modules[path] = content;
    }
  }
  return modules;
}

/**
 * The bundle webpack just emitted, evaluated. The CLI used to `require()` the
 * file it wrote; the module is built the same way here, from the source in
 * memory, so nothing has to touch the disk to be run.
 *
 * What runs is the presets file compiled against placeholder components (see
 * generateVirtualModules), so this builds the element tree and calls no
 * component of the library.
 */
export function evaluateBundle(source: string, filename: string): any {
  const module = { exports: {} as any };
  const wrapper = vm.runInThisContext(`(function (exports, require, module, __filename, __dirname) {${source}\n})`, {
    filename,
  });
  wrapper(module.exports, require, module, filename, '/');
  return module.exports;
}
