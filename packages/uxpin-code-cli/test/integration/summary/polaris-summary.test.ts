import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 100000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/polaris', '--summary')
        .then((output) => {
          // then
          expect(output).toEqual(`AccountConnection
    📜 documentation: ✔

ActionList
    📜 documentation: ✔

Avatar
    📜 documentation: ✔

Badge
    📜 documentation: ✔

Banner
    📜 documentation: ✔

Breadcrumbs
    📜 documentation: ✘

Button
    📜 documentation: ✔

ButtonGroup
    📜 documentation: ✔

CalloutCard
    📜 documentation: ✔

Caption
    📜 documentation: ✔

Card
    📜 documentation: ✔

Checkbox
    📜 documentation: ✔

Choice
    📜 documentation: ✔

ChoiceList
    📜 documentation: ✔

Collapsible
    📜 documentation: ✔

ColorPicker
    📜 documentation: ✔

Connected
    📜 documentation: ✘

DatePicker
    📜 documentation: ✔

DescriptionList
    📜 documentation: ✔

DisplayText
    📜 documentation: ✔

EmptyState
    📜 documentation: ✔

EventListener
    📜 documentation: ✘

FooterHelp
    📜 documentation: ✔

FormLayout
    📜 documentation: ✔

Heading
    📜 documentation: ✔

Icon
    📜 documentation: ✔

Image
    📜 documentation: ✘

KeyboardKey
    📜 documentation: ✔

KeypressListener
    📜 documentation: ✘

labelID
    📜 documentation: ✘

Labelled
    📜 documentation: ✘

Layout
    📜 documentation: ✔

Link
    📜 documentation: ✔

List
    📜 documentation: ✔

Page
    📜 documentation: ✔

PageActions
    📜 documentation: ✔

Pagination
    📜 documentation: ✔

Popover
    📜 documentation: ✔

PositionedOverlay
    📜 documentation: ✘

RadioButton
    📜 documentation: ✔

ResourceList
    📜 documentation: ✔

Scrollable
    📜 documentation: ✔

Select
    📜 documentation: ✔

SettingAction
    📜 documentation: ✔

SettingToggle
    📜 documentation: ✔

Stack
    📜 documentation: ✔

Subheading
    📜 documentation: ✔

Tabs
    📜 documentation: ✔

Tag
    📜 documentation: ✔

TextContainer
    📜 documentation: ✘

TextField
    📜 documentation: ✔

TextStyle
    📜 documentation: ✔

Thumbnail
    📜 documentation: ✔

Tooltip
    📜 documentation: ✔

UnstyledLink
    📜 documentation: ✘

VisuallyHidden
    📜 documentation: ✔`);
        });
    });
  });
});
