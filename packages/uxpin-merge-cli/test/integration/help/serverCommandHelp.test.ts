import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

const CURRENT_TIMEOUT = 20000;

describe('--help option for `server` command', () => {
  let output: string;

  beforeAll(async () => {
    // when
    output = await runUXPinMergeCommand({ params: ['--help'] });
  }, CURRENT_TIMEOUT);

  it('it prints help for --webpack-config <path> option', () => {
    // then
    expect(output).toMatch(
      /--webpack-config <path>\s+path to a custom webpack config, relative to the current working directory/
    );
  });

  it('it prints help for --wrapper <path> option', () => {
    // then
    expect(output).toMatch(
      /--wrapper <path>\s+path to a custom component wrapper, relative to the current working directory/
    );
  });

  it('it prints help for --cwd <path> option', () => {
    // then
    expect(output).toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
  });

  it('it prints help for --port <number> option', () => {
    // then
    expect(output).toMatch(/--port <number>\s+port number/);
  });
});
