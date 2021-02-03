import { readFile, rmdirSync, unlinkSync } from 'fs-extra';
import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

const DS_DIR:string = 'test/resources/designSystems/withoutPresets';
describe('The generate presets command', () => {

  describe('run for ds without presets repository', () => {
    const COMPONENT_DIR:string = 'src/components/Avatar';

    afterEach(() => {
      unlinkSync(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`);
      rmdirSync(`${DS_DIR}/${COMPONENT_DIR}/presets`);
    });

    it('create 0-default.jsx for Avatar component', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/withoutPresets',
        params: [Command.GENERATE_PRESETS, `--component-path "${COMPONENT_DIR}/Avatar.tsx"`],
      }).then(async () => {
        // then
        const content:string = await readFile(`${DS_DIR}/${COMPONENT_DIR}/presets/0-default.jsx`, 'utf-8');
        expect(content).toMatchSnapshot();
      });
    });
  });
});
