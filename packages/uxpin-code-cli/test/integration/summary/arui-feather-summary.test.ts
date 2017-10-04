import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/arui-feather', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`amount
app-content
app-menu
app-title
attach
button
calendar
calendar-input
card-input
checkbox
checkbox-group
collapse
copyright
dropdown
email-input
error-page
footer
form
form-field
header
heading
icon
input
input-autocomplete
input-group
isolated-container
label
link
list
masked-input
menu
menu-item
money-input
mq
notification
page
paragraph
phone-input
plate
popup
popup-container-provider
popup-header
radio
radio-group
render-in-container
resize-sensor
select
sidebar
slide-down
spin
support
textarea
theme-provider
user`);
        });
    });
  });
});
