import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

describe('--help option for `summary` command', () => {
  let output: string;

  beforeAll(async () => {
    output = await runUXPinMergeCommand({ params: [Command.SUMMARY, '--help'] });
  });

  it('it prints description for summary command', () => {
    // then
    expect(output).toContain('Show only design system summary without building it');
  });

  it('it prints help for --config <path> option', () => {
    // then
    expect(output).toMatch(/--config <path>\s+path to a config file\. Default: `\.\/uxpin\.config\.js`/);
  });

  it('it prints help for --cwd <path> option', () => {
    // then
    expect(output).toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
  });
});
