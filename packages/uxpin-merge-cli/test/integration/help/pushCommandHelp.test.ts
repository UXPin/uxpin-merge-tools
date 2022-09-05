import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

describe('--help option for `push` command', () => {
  let output: string;

  beforeAll(async () => {
    output = await runUXPinMergeCommand({ params: [Command.PUSH, '--help'] });
  });

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
});
