import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

describe('--help option for `summary` command', () => {
  it('it prints description for summary command', async () => {
    // when
    const output:string = await runUXPinMergeCommand({ params: ['summary', '--help'] });

    // then
    expect(output).toContain('Show only design system summary without building it');
  });

  it('it prints help for --config <path> option', async () => {
    // when
    const output:string = await runUXPinMergeCommand({ params: ['summary', '--help'] });

    // then
    expect(output)
      .toMatch(/--config <path>\s+path to a config file\. '\.\/uxpin\.config\.js' is used by default\./);
  });

  it('it prints help for --cwd <path> option', async () => {
    // when
    const output:string = await runUXPinMergeCommand({ params: ['summary', '--help'] });

    // then
    expect(output).toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
  });
});
