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
            `alert
    📜 documentation: ✔

animate
    📜 documentation: ✔

avatar
    📜 documentation: ✔

badge
    📜 documentation: ✔

button
    📜 documentation: ✔

dropdown
    📜 documentation: ✔

flag
    📜 documentation: ✔

icon
    📜 documentation: ✔

input
    📜 documentation: ✔

labeled-value
    📜 documentation: ✔

li
    📜 documentation: ✔

logo
    📜 documentation: ✔

pane
    📜 documentation: ✔

radio-group
    📜 documentation: ✔

segmented-control
    📜 documentation: ✔

spinner
    📜 documentation: ✔

table
    📜 documentation: ✔

tbody
    📜 documentation: ✘

td
    📜 documentation: ✘

tfoot
    📜 documentation: ✘

th
    📜 documentation: ✘

thead
    📜 documentation: ✘

tooltip
    📜 documentation: ✔

tr
    📜 documentation: ✘

ul
    📜 documentation: ✔`);
        });
    });
  });
});
