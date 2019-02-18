import { join } from 'path';
import { Command } from '../../../src';

import { LIBRARY_OUTPUT_FILENAME, TEMP_DIR_NAME } from '../../../src/steps/building/config/getConfig';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { testDirPath } from '../../utils/resources/testDirPath';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building repos/nordnet-ui-kit design system', () => {
  describe('with required user webpack config', () => {
    let components:any;
    let consoleOutput:string;

    beforeAll(() => {
      const params:string[] = [
        Command.PUSH,
        '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
        '--config="../../configs/nordnet-ui-kit-uxpin.config.js"',
        '--wrapper "./documentation/wrapper.jsx"',
      ];

      return runUXPinMergeCommand({ cwd: 'resources/repos/nordnet-ui-kit', params })
        .then((output) => {
          const path:string = join(
            testDirPath, 'resources/repos/nordnet-ui-kit', TEMP_DIR_NAME, LIBRARY_OUTPUT_FILENAME,
          );
          components = require(path);
          consoleOutput = output;
        });
    });

    it('contains Button component', () => {
      // when
      const { Button } = components;
      // then
      expect(Button).toBeInstanceOf(Function);
    });

    it('contains custom wrapper', () => {
      // when
      const { Wrapper } = components;
      // then
      expect(Wrapper).toBeInstanceOf(Function);
    });

    it('prints warnings without stack traces to the console', () => {
      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });

  describe('without required user webpack config', () => {
    it('throws an error', () => {
      return runUXPinMergeCommand({ cwd: 'resources/repos/nordnet-ui-kit', params: [Command.PUSH] })
        .then((output) => {
          expect(output).toContain('ERROR:');
          expect(output).toContain('Module parse failed');
        });
    });
  });
});
