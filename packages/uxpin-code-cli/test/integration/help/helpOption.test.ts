import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 20000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--help option', () => {
  it('it prints help for --dump option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output)
        .toMatch(/--dump\s+Show all information about the design system repository and NOT send to UXPin/);
    });
  });

  it('it prints help for --summary option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toMatch(/--summary\s+Show only design system summary without building it/);
    });
  });

  it('it prints help for --webpack-config <path> option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toMatch(/--webpack-config <path>\s+Use custom webpack config/);
    });
  });

  it('it prints help for --wrapper <path> option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toMatch(/--wrapper <path>\s+Use custom wrapper/);
    });
  });
});
