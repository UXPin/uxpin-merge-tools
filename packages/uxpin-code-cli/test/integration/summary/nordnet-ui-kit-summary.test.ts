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
          expect(output).toContain(`alert
animate
avatar
badge
button
dropdown
flag
icon
input
labeled-value
li
logo
pane
radio-group
segmented-control
spinner
table
tbody\n` + // no examples
`td\n` + // no examples
`tfoot\n` + // no examples
`th\n` + // no examples
`thead\n` + // no examples
`tooltip
tr\n` + // no examples
`ul`);
        });
    });
  });
});
