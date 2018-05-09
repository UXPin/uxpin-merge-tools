import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in mineral-ui example', async () => {
      // when
      const output:string = await runUXPinCodeCommand({ cwd: 'resources/repos/mineral-ui', params: ['--summary'] });

      // then
      expect(output).toEqual(
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

    IconArrowDropdownDown
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconArrowDropdownUp
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconCheckBoxCheck
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconCheckBoxIndeterminate
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconDanger
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconDangerSimple
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconExpandLess
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconExpandMore
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconMoreHoriz
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconRadioButtonCheck
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconSuccess
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconSuccessSimple
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconWarning
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconWarningSimple
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘


`);
    });
  });
});
