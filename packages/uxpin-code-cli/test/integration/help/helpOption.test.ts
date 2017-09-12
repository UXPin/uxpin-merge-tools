import { runUxPinCodeCommand } from '../../utils/command/runUxPinCodeCommand';

describe('--help option', () => {
  it('it prints help for --dump option', () => {
    // when
    return runUxPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output)
        .toMatch(/--dump\s+Show all information about the design system repository and NOT send to UXPin/);
    });
  });

  it('it prints help for --summary option', () => {
    // when
    return runUxPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toMatch(/--summary\s+Show design system summary/);
    });
  });
});
