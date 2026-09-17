import { join } from 'path';
import {
  createVirtualProject,
  existsSync,
  glob,
  pathExists,
  readFile,
  resolveProjectPath,
  runOnVirtualProject,
  unlink,
  writeFile,
} from '../projectFs';

const ROOT = '/uxpin-merge-project';
const project = () =>
  createVirtualProject(
    [
      { content: 'module.exports = {};', path: join(ROOT, 'uxpin.config.js') },
      { content: 'export default 1;', path: join(ROOT, 'src/Button/Button.tsx') },
    ],
    ROOT
  );

/**
 * The filesystem the serialization reads through. With no virtual project in
 * scope every function here is the fs-extra one it replaced, which is what the
 * CLI keeps using; inside `runOnVirtualProject` the same calls read the
 * project held in memory.
 */
describe('a project read from memory', () => {
  it('reads its own files, by absolute path and by a path relative to its root', async () => {
    await runOnVirtualProject(project(), async () => {
      expect(await readFile(join(ROOT, 'uxpin.config.js'))).toEqual('module.exports = {};');
      // Component paths travel relative to the project root, as they do for
      // the CLI, whose working directory that is.
      expect(await readFile('src/Button/Button.tsx')).toEqual('export default 1;');
      expect(resolveProjectPath('src/Button/Button.tsx')).toEqual(join(ROOT, 'src/Button/Button.tsx'));
    });
  });

  it('answers about its own files only, so where the process runs cannot decide what is in it', async () => {
    await runOnVirtualProject(project(), async () => {
      expect(await pathExists('src/Button/Button.tsx')).toBe(true);
      // This file exists on the real disk, and a virtual project still says no:
      // otherwise the directory a server happens to run in would be read as
      // part of the project.
      expect(await pathExists(__filename)).toBe(false);
      expect(existsSync(__filename)).toBe(false);
    });
  });

  it('globs the project rather than the disk', async () => {
    await runOnVirtualProject(project(), async () => {
      expect(await glob('src/**/*.tsx', { cwd: ROOT })).toEqual(['src/Button/Button.tsx']);
    });
  });

  it('writes and deletes inside itself, leaving the disk alone', async () => {
    await runOnVirtualProject(project(), async () => {
      await writeFile('build/bundle.js', 'module.exports = {};');
      expect(await readFile('build/bundle.js')).toEqual('module.exports = {};');

      await unlink('build/bundle.js');
      expect(await pathExists('build/bundle.js')).toBe(false);
      // Deleting what is not there is not an error: the CLI removes its
      // temporary bundle whether or not the compile got that far.
      await expect(unlink('build/bundle.js')).resolves.toBeUndefined();
    });
  });

  it('is the real filesystem again once the project is out of scope', async () => {
    await runOnVirtualProject(project(), async () => undefined);

    expect(await pathExists(__filename)).toBe(true);
    expect(await pathExists(join(ROOT, 'uxpin.config.js'))).toBe(false);
  });
});
