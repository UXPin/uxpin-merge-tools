import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('The --dump option', () => {
  describe('run for the mineral-ui repository', () => {
    it('prints the JSON describing the full repository', async () => {
      // when
      const output:string = await runUXPinCodeCommand({ cwd: 'resources/repos/mineral-ui', params: ['--dump'] });

      // then
      expect(output).toMatchSnapshot();
    });
  });
});
