import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';

describe('--help option', () => {
  it('it prints help for --dump option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toContain('--dump');
      expect(output).toContain('Show all information about the design system repository and NOT send to UXPin');
    });
  });

  it('it prints help for --summary option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toContain('--summary');
      expect(output).toContain('Show design system summary');
    });
  });
});
