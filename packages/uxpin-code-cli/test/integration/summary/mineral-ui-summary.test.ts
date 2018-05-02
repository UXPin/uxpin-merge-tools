import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in mineral-ui example', () => {
      // when
      return runUXPinCodeCommand({
        cwd: 'resources/repos/mineral-ui',
        params: ['--summary', '--config="../../configs/mineral-ui-uxpin.config.js"'],
      })
        .then((output) => {
          // then
          expect(output).toContain(
            `Uncategorized

    Button
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Card
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Dropdown
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Link
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Menu
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Popover
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Portal
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    TextInput
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

Icons

    Icon
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconDanger
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconSuccess
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconWarning
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘`);
        });
    });
  });
});
