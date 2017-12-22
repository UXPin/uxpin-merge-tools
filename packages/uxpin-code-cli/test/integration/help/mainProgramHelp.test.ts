import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 20000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--help option', () => {
  it('it prints help for --dump option', () => {
    // when
    return runUXPinCodeCommand({ params: ['--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/--dump\s+Show all information about the design system repository and NOT send to UXPin/);
    });
  });

  it('it prints help for --summary option', () => {
    // when
    return runUXPinCodeCommand({ params: ['--help'] }).then((output) => {
      // then
      expect(output).toMatch(/--summary\s+Show only design system summary without building it/);
    });
  });

  it('it prints help for --webpack-config <path> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['--help'] }).then((output) => {
      // then
      expect(output).toMatch(/--webpack-config <path>\s+path to a custom webpack config, relative to the project root/);
    });
  });

  it('it prints help for --wrapper <path> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/--wrapper <path>\s+path to a custom component wrapper implementation, relative to the project root/);
    });
  });

  it('it prints help for --cwd <path> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
    });
  });

  it('it prints `server` command in command list', () => {
// when
    return runUXPinCodeCommand({ params: ['--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/server \[options\]\s+Start local web server and display the list of design system components/);
    });
  });

});
