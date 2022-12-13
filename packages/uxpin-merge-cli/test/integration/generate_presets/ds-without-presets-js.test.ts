import { readFile, rmdirSync, unlinkSync } from 'fs-extra';
import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const DS_DIR = 'test/resources/designSystems/withoutPresetsJs';
describe('The generate presets command', () => {
  describe('run for Avatar component', () => {
    const COMPONENT_DIR = 'src/components/Avatar';

    afterEach(() => {
      unlinkSync(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`);
      rmdirSync(`${DS_DIR}/${COMPONENT_DIR}/presets`);
    });

    it('create 0-default.jsx', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresetsJs',
        params: [Command.GENERATE_PRESETS, `--component-path "${COMPONENT_DIR}/Avatar.jsx"`],
      }).then(async () => {
        // then
        const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`, 'utf-8');
        expect(content).toMatchSnapshot();
      });
    });
  });

  describe('run for Button component', () => {
    const COMPONENT_DIR = 'src/components/Button';

    afterEach(() => {
      unlinkSync(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`);
      rmdirSync(`${DS_DIR}/${COMPONENT_DIR}/presets`);
    });

    it('create 0-default.jsx', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresetsJs',
        params: [Command.GENERATE_PRESETS, `--component-path "${COMPONENT_DIR}/Button.jsx"`],
      }).then(async () => {
        // then
        const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`, 'utf-8');
        expect(content).toMatchSnapshot();
      });
    });
  });

  describe('run for whole ds based on uxpin.config.js', () => {
    const COMPONENT_DIRS: string[] = ['src/components/Avatar', 'src/components/Button'];

    afterAll(async () => {
      COMPONENT_DIRS.forEach((dir) => {
        unlinkSync(`${DS_DIR}/${dir}/presets/0-default.jsx`);
        rmdirSync(`${DS_DIR}/${dir}/presets`);
      });
    });

    beforeAll(async () => {
      await runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresetsJs',
        params: [Command.GENERATE_PRESETS, `--config "uxpin.config.js"`],
      });
    });

    it('create 0-default.jsx for Avatar', async () => {
      // when
      const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIRS[0]}/presets/0-default.jsx`, 'utf-8');
      expect(content).toMatchSnapshot();
    });

    it('create 0-default.jsx for Button', async () => {
      // when
      const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIRS[1]}/presets/0-default.jsx`, 'utf-8');
      expect(content).toMatchSnapshot();
    });
  });
});
