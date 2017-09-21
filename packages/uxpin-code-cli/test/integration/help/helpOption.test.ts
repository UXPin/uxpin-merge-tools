import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';

describe('--help option', () => {
  it('it prints help for --dump option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output)
        .toMatch(/--dump\s+Show all information about the design system repository and NOT send to UXPin/);
    });
  });

  it('it prints help for --summary option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toMatch(/--summary\s+Show only design system summary without building it/);
    });
  });

  it('it prints help for --babel-plugins <items> option', () => {
    // when
    return runUXPinCodeCommand('./', '--help').then((output) => {
      // then
      expect(output).toContain('--babel-plugins <items>');
      expect(output).toContain('Use custom babel plugins');
    });
  });
});
