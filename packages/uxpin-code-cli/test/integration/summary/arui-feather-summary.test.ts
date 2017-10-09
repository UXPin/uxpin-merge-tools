import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/arui-feather', '--summary').then((output) => {
        // then
        expect(output).toContain(
          `amount
    📜 documentation: ✔

app-content
    📜 documentation: ✔

app-menu
    📜 documentation: ✔

app-title
    📜 documentation: ✔

attach
    📜 documentation: ✔

button
    📜 documentation: ✔

calendar
    📜 documentation: ✔

calendar-input
    📜 documentation: ✔

card-input
    📜 documentation: ✔

checkbox
    📜 documentation: ✔

checkbox-group
    📜 documentation: ✔

collapse
    📜 documentation: ✔

copyright
    📜 documentation: ✔

dropdown
    📜 documentation: ✔

email-input
    📜 documentation: ✔

error-page
    📜 documentation: ✘

footer
    📜 documentation: ✔

form
    📜 documentation: ✔

form-field
    📜 documentation: ✔

header
    📜 documentation: ✔

heading
    📜 documentation: ✔

icon
    📜 documentation: ✔

input
    📜 documentation: ✔

input-autocomplete
    📜 documentation: ✔

input-group
    📜 documentation: ✔

isolated-container
    📜 documentation: ✘

label
    📜 documentation: ✔

link
    📜 documentation: ✔

list
    📜 documentation: ✔

masked-input
    📜 documentation: ✘

menu
    📜 documentation: ✔

menu-item
    📜 documentation: ✔

money-input
    📜 documentation: ✔

mq
    📜 documentation: ✘

notification
    📜 documentation: ✔

page
    📜 documentation: ✔

paragraph
    📜 documentation: ✔

phone-input
    📜 documentation: ✔

plate
    📜 documentation: ✘

popup
    📜 documentation: ✔

popup-container-provider
    📜 documentation: ✘

popup-header
    📜 documentation: ✔

radio
    📜 documentation: ✔

radio-group
    📜 documentation: ✔

render-in-container
    📜 documentation: ✘

resize-sensor
    📜 documentation: ✘

select
    📜 documentation: ✔

sidebar
    📜 documentation: ✔

slide-down
    📜 documentation: ✔

spin
    📜 documentation: ✔

support
    📜 documentation: ✔

textarea
    📜 documentation: ✔

theme-provider
    📜 documentation: ✘

user
    📜 documentation: ✔`);
      });
    });
  });
});
