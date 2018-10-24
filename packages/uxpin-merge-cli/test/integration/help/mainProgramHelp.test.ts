import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 20000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--help option', () => {

  let output:string;

  beforeAll(async () => {
    // when
    output = await runUXPinMergeCommand({ params: ['--help'] });
  });

  it('it prints help for --webpack-config <path> option', () => {
    // then
    expect(output).toMatch(
      /--webpack-config <path>\s+path to a custom webpack config, relative to the current working directory/,
    );
  });

  it('it prints help for --wrapper <path> option', () => {
    // then
    expect(output)
      .toMatch(/--wrapper <path>\s+path to a custom component wrapper, relative to the current working directory/);
  });

  it('it prints help for --config <path> option', () => {
    // then
    expect(output)
      .toMatch(/--config <path>\s+path to a config file. Default: `\.\/uxpin\.config\.js`/);
  });

  it('it prints help for --cwd <path> option', () => {
    // then
    expect(output)
      .toMatch(/--cwd <path>\s+working directory: path to root of the DS repository/);
  });

  it('it prints `server` command in command list', () => {
    // then
    expect(output)
      .toMatch(/server \[options\]\s+Start local web server and display the list of design system components/);
  });

  it('it prints `push` command in command list', () => {
    // then
    expect(output)
      .toMatch(/push \[options\]\s+Upload design system repository information to UXPin/);
  });

  it('it prints `dump` command in command list', () => {
    // then
    expect(output).toMatch(
      /dump \[options\]\s+Shows all information \(in JSON\) about the design system repository and NOT send to UXPin/,
    );
  });

  it('it prints `summary` command in command list', () => {
    // then
    expect(output).toMatch(/summary \[options\]\s+Show only design system summary without building it/);
  });
});
