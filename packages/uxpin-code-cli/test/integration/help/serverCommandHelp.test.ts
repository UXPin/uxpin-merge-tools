import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 20000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--help option for `server` command', () => {
  it('it prints help for --dump option', () => {
    // when
    return runUXPinCodeCommand({ params: ['server', '--help'] }).then((output) => {
      // then
      expect(output).not.toMatch(/--dump/);
    });
  });

  it('it prints help for --summary option', () => {
    // when
    return runUXPinCodeCommand({ params: ['server', '--help'] }).then((output) => {
      // then
      expect(output).not.toMatch(/--summary/);
    });
  });

  it('it prints help for --webpack-config <path> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['server', '--help'] }).then((output) => {
      // then
      expect(output).toMatch(/--webpack-config <path>\s+path to a custom webpack config, relative to the project root/);
    });
  });

  it('it prints help for --wrapper <path> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['server', '--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/--wrapper <path>\s+path to a custom component wrapper implementation, relative to the project root/);
    });
  });

  it('it prints help for --cwd <path> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['server', '--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
    });
  });

  it('it prints help for --port <number> option', () => {
    // when
    return runUXPinCodeCommand({ params: ['server', '--help'] }).then((output) => {
      // then
      expect(output)
        .toMatch(/--port <number>\s+port number/);
    });
  });
});
