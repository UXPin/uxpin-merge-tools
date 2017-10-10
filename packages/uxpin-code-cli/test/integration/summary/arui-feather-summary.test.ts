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
          `Amount
    📜 documentation: ✔

AppContent
    📜 documentation: ✔

AppMenu
    📜 documentation: ✔

AppTitle
    📜 documentation: ✔

Attach
    📜 documentation: ✔

Button
    📜 documentation: ✔

Calendar
    📜 documentation: ✔

CalendarInput
    📜 documentation: ✔

CardInput
    📜 documentation: ✔

Checkbox
    📜 documentation: ✔

CheckboxGroup
    📜 documentation: ✔

Collapse
    📜 documentation: ✔

Copyright
    📜 documentation: ✔

Dropdown
    📜 documentation: ✔

EmailInput
    📜 documentation: ✔

ErrorPage
    📜 documentation: ✘

Footer
    📜 documentation: ✔

Form
    📜 documentation: ✔

FormField
    📜 documentation: ✔

Header
    📜 documentation: ✔

Heading
    📜 documentation: ✔

Icon
    📜 documentation: ✔

Input
    📜 documentation: ✔

InputAutocomplete
    📜 documentation: ✔

InputGroup
    📜 documentation: ✔

IsolatedContainer
    📜 documentation: ✘

Label
    📜 documentation: ✔

Link
    📜 documentation: ✔

List
    📜 documentation: ✔

MaskedInput
    📜 documentation: ✘

Menu
    📜 documentation: ✔

MenuItem
    📜 documentation: ✔

MoneyInput
    📜 documentation: ✔

Mq
    📜 documentation: ✘

Notification
    📜 documentation: ✔

Page
    📜 documentation: ✔

Paragraph
    📜 documentation: ✔

PhoneInput
    📜 documentation: ✔

Plate
    📜 documentation: ✘

Popup
    📜 documentation: ✔

PopupContainerProvider
    📜 documentation: ✘

PopupHeader
    📜 documentation: ✔

Radio
    📜 documentation: ✔

RadioGroup
    📜 documentation: ✔

RenderInContainer
    📜 documentation: ✘

ResizeSensor
    📜 documentation: ✘

Select
    📜 documentation: ✔

Sidebar
    📜 documentation: ✔

SlideDown
    📜 documentation: ✔

Spin
    📜 documentation: ✔

Support
    📜 documentation: ✔

Textarea
    📜 documentation: ✔

ThemeProvider
    📜 documentation: ✘

User
    📜 documentation: ✔`);
      });
    });
  });
});
