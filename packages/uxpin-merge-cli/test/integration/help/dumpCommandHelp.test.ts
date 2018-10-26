import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

describe('--help option for `dump` command', () => {

  let output:string;

  beforeAll(async () => {
    output = await runUXPinMergeCommand({ params: [Command.DUMP, '--help'] });
  });

  it('it prints description for dump command', () => {
    // then
    expect(output).toContain(
      'Shows all information (in JSON) about the design system repository and NOT send to UXPin',
    );
  });

  it('it prints help for --cwd <path> option', () => {
    // then
    expect(output).toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
  });
});
