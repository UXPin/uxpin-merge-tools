import { runUxPinCodeCommand } from '../../utils/command/runUxPinCodeCommand';

describe('--dump option integration', () => {
  describe('--dump option prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUxPinCodeCommand('resources/repos/arui-feather', '--dump').then((output) => {
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
checkbox-group
checkbox
collapse
copyright
dropdown
email-input
error-page
footer
form-field
form
header
heading
icon
input-autocomplete
input-group
input
isolated-container
label
link
list
masked-input
menu-item
menu
money-input
mq
notification
page
paragraph
phone-input
plate
popup-container-provider
popup-header
popup
radio-group
radio
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
    it('prints the list of components found in nordnet-ui-kit example', () => {
      // when
      return runUxPinCodeCommand('resources/repos/nordnet-ui-kit', '--dump').then((output) => {
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
