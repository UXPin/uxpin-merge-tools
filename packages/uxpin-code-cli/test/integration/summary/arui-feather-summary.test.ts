import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUXPinCodeCommand({ cwd: 'resources/repos/arui-feather', params: ['--summary'] }).then((output) => {
        // then
        expect(output).toContain(
          `Amount
    📜 documentation: ✔
    💡 examples: ✔

Attach
    📜 documentation: ✔
    💡 examples: ✔

Button
    📜 documentation: ✔
    💡 examples: ✔

Calendar
    📜 documentation: ✔
    💡 examples: ✔

CalendarInput
    📜 documentation: ✔
    💡 examples: ✔

CardInput
    📜 documentation: ✔
    💡 examples: ✔

Checkbox
    📜 documentation: ✔
    💡 examples: ✔

CheckboxGroup
    📜 documentation: ✔
    💡 examples: ✔

Collapse
    📜 documentation: ✔
    💡 examples: ✔

Dropdown
    📜 documentation: ✔
    💡 examples: ✔

EmailInput
    📜 documentation: ✔
    💡 examples: ✔

FlagIcon
    📜 documentation: ✔
    💡 examples: ✔

Form
    📜 documentation: ✔
    💡 examples: ✔

FormField
    📜 documentation: ✔
    💡 examples: ✔

Heading
    📜 documentation: ✔
    💡 examples: ✔

Icon
    📜 documentation: ✔
    💡 examples: ✔

IconButton
    📜 documentation: ✔
    💡 examples: ✔

Input
    📜 documentation: ✔
    💡 examples: ✔

InputAutocomplete
    📜 documentation: ✔
    💡 examples: ✔

InputGroup
    📜 documentation: ✔
    💡 examples: ✔

IntlPhoneInput
    📜 documentation: ✔
    💡 examples: ✔

IsolatedContainer
    📜 documentation: ✘
    💡 examples: ✘

Label
    📜 documentation: ✔
    💡 examples: ✔

Link
    📜 documentation: ✔
    💡 examples: ✔

List
    📜 documentation: ✔
    💡 examples: ✔

MaskedInput
    📜 documentation: ✘
    💡 examples: ✘

Menu
    📜 documentation: ✔
    💡 examples: ✔

MenuItem
    📜 documentation: ✔
    💡 examples: ✔

MoneyInput
    📜 documentation: ✔
    💡 examples: ✔

Mq
    📜 documentation: ✘
    💡 examples: ✘

Notification
    📜 documentation: ✔
    💡 examples: ✔

Paragraph
    📜 documentation: ✔
    💡 examples: ✔

PhoneInput
    📜 documentation: ✔
    💡 examples: ✔

Plate
    📜 documentation: ✔
    💡 examples: ✔

Popup
    📜 documentation: ✔
    💡 examples: ✔

PopupContainerProvider
    📜 documentation: ✘
    💡 examples: ✘

PopupHeader
    📜 documentation: ✔
    💡 examples: ✘

ProgressBar
    📜 documentation: ✔
    💡 examples: ✔

Radio
    📜 documentation: ✔
    💡 examples: ✔

RadioGroup
    📜 documentation: ✔
    💡 examples: ✔

RenderInContainer
    📜 documentation: ✘
    💡 examples: ✘

ResizeSensor
    📜 documentation: ✘
    💡 examples: ✘

Select
    📜 documentation: ✔
    💡 examples: ✔

Sidebar
    📜 documentation: ✔
    💡 examples: ✔

SlideDown
    📜 documentation: ✔
    💡 examples: ✔

Spin
    📜 documentation: ✔
    💡 examples: ✔

Swipeable
    📜 documentation: ✘
    💡 examples: ✘

TabItem
    📜 documentation: ✔
    💡 examples: ✔

Tabs
    📜 documentation: ✔
    💡 examples: ✔

TagButton
    📜 documentation: ✔
    💡 examples: ✔

Textarea
    📜 documentation: ✔
    💡 examples: ✔

ThemeProvider
    📜 documentation: ✔
    💡 examples: ✘`);
      });
    });
  });
});
