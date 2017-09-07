import { runUxPinCodeCommand } from '../../utils/runUxPinCodeCommand';

describe('--dump option integration', () => {
  describe('--dump option prints ', () => {
    it('', () => {
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
  });
});