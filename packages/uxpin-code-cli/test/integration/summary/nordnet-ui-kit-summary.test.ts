import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 15000;

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

Animate
    📜 documentation: ✔

Avatar
    📜 documentation: ✔

Badge
    📜 documentation: ✔

Button
    📜 documentation: ✔

Dropdown
    📜 documentation: ✔

Flag
    📜 documentation: ✔

Icon
    📜 documentation: ✔

Input
    📜 documentation: ✔

LabeledValue
    📜 documentation: ✔

Li
    📜 documentation: ✔

Logo
    📜 documentation: ✔

Pane
    📜 documentation: ✔

RadioGroup
    📜 documentation: ✔

SegmentedControl
    📜 documentation: ✔

Spinner
    📜 documentation: ✔

Table
    📜 documentation: ✔

Tbody
    📜 documentation: ✘

Td
    📜 documentation: ✘

Tfoot
    📜 documentation: ✘

Th
    📜 documentation: ✘

Thead
    📜 documentation: ✘

Tooltip
    📜 documentation: ✔

Tr
    📜 documentation: ✘

Ul
    📜 documentation: ✔`);
        });
    });
  });
});
