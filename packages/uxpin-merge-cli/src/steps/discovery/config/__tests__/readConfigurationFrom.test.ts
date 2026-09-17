import { join } from 'path';
import { createVirtualProject, runOnVirtualProject } from '../../../../common/fs/projectFs';
import { readConfigurationFrom } from '../readConfigurationFrom';

const ROOT = '/uxpin-merge-project';
const CONFIG_PATH = join(ROOT, 'uxpin.config.js');

const withProject = (content: string, run: () => Promise<void>) =>
  runOnVirtualProject(createVirtualProject([{ content, path: CONFIG_PATH }], ROOT), run);

/**
 * uxpin.config.js is a CommonJS module, and the CLI `require`s it. A project
 * held in memory has no module tree to require from, so its config is run as
 * the module it is.
 */
describe('the configuration of a project held in memory', () => {
  it('is evaluated, exports and all', async () => {
    await withProject(`module.exports = { name: 'A Virtual Library', components: { categories: [] } };`, async () => {
      expect(readConfigurationFrom(CONFIG_PATH)).toMatchObject({ name: 'A Virtual Library' });
    });
  });

  it('may compute what it exports, as a config on disk may', async () => {
    await withProject(
      `const names = ['Forms', 'Layout'];
module.exports = { components: { categories: names.map((name) => ({ name, include: [] })) } };`,
      async () => {
        const config: any = readConfigurationFrom(CONFIG_PATH);
        expect(config.components.categories.map((category: any) => category.name)).toEqual(['Forms', 'Layout']);
      }
    );
  });

  it('falls back to the defaults when the project carries none, as the CLI does', async () => {
    await runOnVirtualProject(createVirtualProject([], ROOT), async () => {
      expect(readConfigurationFrom(CONFIG_PATH)).toBeUndefined();
    });
  });
});
