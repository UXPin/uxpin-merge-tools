import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in nordnet-ui-kit example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(
            `Alert
    📜 documentation: ✔
    💡 examples: ✘

Animate
    📜 documentation: ✔
    💡 examples: ✘

Avatar
    📜 documentation: ✔
    💡 examples: ✘

Badge
    📜 documentation: ✔
    💡 examples: ✘

Button
    📜 documentation: ✔
    💡 examples: ✘

Dropdown
    📜 documentation: ✔
    💡 examples: ✘

Flag
    📜 documentation: ✔
    💡 examples: ✘

Icon
    📜 documentation: ✔
    💡 examples: ✘

Input
    📜 documentation: ✔
    💡 examples: ✘

LabeledValue
    📜 documentation: ✔
    💡 examples: ✘

Li
    📜 documentation: ✔
    💡 examples: ✘

Logo
    📜 documentation: ✔
    💡 examples: ✘

Pane
    📜 documentation: ✔
    💡 examples: ✘

RadioGroup
    📜 documentation: ✔
    💡 examples: ✘

SegmentedControl
    📜 documentation: ✔
    💡 examples: ✘

Spinner
    📜 documentation: ✔
    💡 examples: ✘

Table
    📜 documentation: ✔
    💡 examples: ✘

Tbody
    📜 documentation: ✘
    💡 examples: ✘

Td
    📜 documentation: ✘
    💡 examples: ✘

Tfoot
    📜 documentation: ✘
    💡 examples: ✘

Th
    📜 documentation: ✘
    💡 examples: ✘

Thead
    📜 documentation: ✘
    💡 examples: ✘

Tooltip
    📜 documentation: ✔
    💡 examples: ✘

Tr
    📜 documentation: ✘
    💡 examples: ✘

Ul
    📜 documentation: ✔
    💡 examples: ✘`);
        });
    });
  });
});
