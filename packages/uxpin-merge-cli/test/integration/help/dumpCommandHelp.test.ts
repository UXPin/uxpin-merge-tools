import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

describe('--help option for `dump` command', () => {
  it('it prints description for dump command', async () => {
    // when
    const output:string = await runUXPinMergeCommand({ params: ['dump', '--help'] });

    // then
    expect(output).toContain(
      'Shows all information (in JSON) about the design system repository and NOT send to UXPin',
    );
  });

  it('it prints help for --cwd <path> option', async () => {
    // when
    const output:string = await runUXPinMergeCommand({ params: ['dump', '--help'] });

    // then
    expect(output).toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
  });
});
