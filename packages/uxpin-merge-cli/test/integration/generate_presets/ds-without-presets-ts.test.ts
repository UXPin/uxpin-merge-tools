import { readFile, rmdirSync, unlinkSync } from 'fs-extra';
import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

const CURRENT_TIMEOUT = 30000;

const DS_DIR = 'test/resources/designSystems/withoutPresets';
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
        cwd: 'resources/designSystems/withoutPresets',
        params: [Command.GENERATE_PRESETS, `--component-path "${COMPONENT_DIR}/Avatar.tsx"`],
      }).then(async () => {
        // then
        const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`, 'utf-8');
        expect(content).toMatchSnapshot();
      });
    });
  });

  describe('run for MenuWithData component', () => {
    const COMPONENT_DIR = 'src/components/MenuWithData';

    afterEach(() => {
      unlinkSync(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`);
      rmdirSync(`${DS_DIR}/${COMPONENT_DIR}/presets`);
    });

    it('create 0-default.jsx', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresets',
        params: [Command.GENERATE_PRESETS, `--component-path "${COMPONENT_DIR}/MenuWithData.tsx"`],
      }).then(async () => {
        // then
        const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`, 'utf-8');
        expect(content).toMatchSnapshot();
      });
    });
  });

  describe('run for ButtonWithIconAsProp component', () => {
    const COMPONENT_DIR = 'src/components/ButtonWithIconAsProp';

    afterEach(() => {
      unlinkSync(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`);
      rmdirSync(`${DS_DIR}/${COMPONENT_DIR}/presets`);
    });

    it('create 0-default.jsx', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresets',
        params: [Command.GENERATE_PRESETS, `--component-path "${COMPONENT_DIR}/ButtonWithIconAsProp.tsx"`],
      }).then(async () => {
        // then
        const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`, 'utf-8');
        expect(content).toMatchSnapshot();
      });
    });
  });

  describe('run for whole ds based on uxpin.config.js', () => {
    const COMPONENT_DIRS: string[] = [
      'src/components/Avatar',
      'src/components/MenuWithData',
      'src/components/ButtonWithIconAsProp',
    ];

    afterAll(async () => {
      COMPONENT_DIRS.forEach((dir) => {
        unlinkSync(`${DS_DIR}/${dir}/presets/0-default.jsx`);
        rmdirSync(`${DS_DIR}/${dir}/presets`);
      });
    });

    beforeAll(async () => {
      await runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresets',
        params: [Command.GENERATE_PRESETS, `--config "uxpin.config.js"`],
      });
    }, CURRENT_TIMEOUT);

    it('create 0-default.jsx for Avatar', async () => {
      // when
      const INDEX = 0;
      const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIRS[INDEX]}/presets/0-default.jsx`, 'utf-8');
      expect(content).toMatchSnapshot();
    });

    it('create 0-default.jsx for MenuWithData', async () => {
      // when
      const INDEX = 1;
      const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIRS[INDEX]}/presets/0-default.jsx`, 'utf-8');
      expect(content).toMatchSnapshot();
    });

    it('create 0-default.jsx for ButtonWithIconAsProp', async () => {
      // when
      const INDEX = 2;
      const content: string = await readFile(`${DS_DIR}/${COMPONENT_DIRS[INDEX]}/presets/0-default.jsx`, 'utf-8');
      expect(content).toMatchSnapshot();
    });
  });
});
