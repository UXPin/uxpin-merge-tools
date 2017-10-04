import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 50000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/polaris', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`AccountConnection
ActionList
Avatar
Badge
Banner
Breadcrumbs
Button
ButtonGroup
CalloutCard
Caption
Card
Checkbox
Choice
ChoiceList
Collapsible
ColorPicker
Connected
DatePicker
DescriptionList
DisplayText
EmptyState
EventListener
FooterHelp
FormLayout
Heading
Icon
Image
KeyboardKey
KeypressListener
Label
Labelled
Layout
Link
List
Page
PageActions
Pagination
Popover
PositionedOverlay
RadioButton
ResourceList
Scrollable
Select
SettingAction
SettingToggle
Stack
Subheading
Tabs
Tag
TextContainer
TextField
TextStyle
Thumbnail
Tooltip
UnstyledLink
VisuallyHidden`);
        });
    });
  });
});
