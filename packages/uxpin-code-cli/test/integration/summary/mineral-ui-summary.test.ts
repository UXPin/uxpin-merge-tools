import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in mineral-ui example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/mineral-ui', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(
            `Button
    📜 documentation: ✔
    💡 examples: ✔

Card
    📜 documentation: ✘
    💡 examples: ✘

Dropdown
    📜 documentation: ✔
    💡 examples: ✔

EventListener
    📜 documentation: ✘
    💡 examples: ✘

Icon
    📜 documentation: ✔
    💡 examples: ✔

Link
    📜 documentation: ✔
    💡 examples: ✔

Menu
    📜 documentation: ✔
    💡 examples: ✔

Popover
    📜 documentation: ✔
    💡 examples: ✔

Portal
    📜 documentation: ✘
    💡 examples: ✘

TextInput
    📜 documentation: ✔
    💡 examples: ✔`);
        });
    });
  });
});
