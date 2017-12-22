import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 150000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinCodeCommand({ cwd: 'resources/repos/polaris', params: ['--summary'] })
        .then((output) => {
          // then
          expect(output).toContain(`AccountConnection
    📜 documentation: ✔
    💡 examples: ✔

ActionList
    📜 documentation: ✔
    💡 examples: ✔

Avatar
    📜 documentation: ✔
    💡 examples: ✔

Badge
    📜 documentation: ✔
    💡 examples: ✔

Banner
    📜 documentation: ✔
    💡 examples: ✔

Breadcrumbs
    📜 documentation: ✘
    💡 examples: ✘

Button
    📜 documentation: ✔
    💡 examples: ✔

ButtonGroup
    📜 documentation: ✔
    💡 examples: ✔

CalloutCard
    📜 documentation: ✔
    💡 examples: ✔

Caption
    📜 documentation: ✔
    💡 examples: ✔

Card
    📜 documentation: ✔
    💡 examples: ✔

Checkbox
    📜 documentation: ✔
    💡 examples: ✔

Choice
    📜 documentation: ✔
    💡 examples: ✘

ChoiceList
    📜 documentation: ✔
    💡 examples: ✔

Collapsible
    📜 documentation: ✔
    💡 examples: ✔

ColorPicker
    📜 documentation: ✔
    💡 examples: ✔

Connected
    📜 documentation: ✘
    💡 examples: ✘

DatePicker
    📜 documentation: ✔
    💡 examples: ✔

DescriptionList
    📜 documentation: ✔
    💡 examples: ✔

DisplayText
    📜 documentation: ✔
    💡 examples: ✔

EmptyState
    📜 documentation: ✔
    💡 examples: ✔

EventListener
    📜 documentation: ✘
    💡 examples: ✘

FooterHelp
    📜 documentation: ✔
    💡 examples: ✔

FormLayout
    📜 documentation: ✔
    💡 examples: ✔

Heading
    📜 documentation: ✔
    💡 examples: ✔

Icon
    📜 documentation: ✔
    💡 examples: ✔

Image
    📜 documentation: ✘
    💡 examples: ✘

KeyboardKey
    📜 documentation: ✔
    💡 examples: ✔

KeypressListener
    📜 documentation: ✘
    💡 examples: ✘

labelID
    📜 documentation: ✘
    💡 examples: ✘

Labelled
    📜 documentation: ✘
    💡 examples: ✘

Layout
    📜 documentation: ✔
    💡 examples: ✔

Link
    📜 documentation: ✔
    💡 examples: ✔

List
    📜 documentation: ✔
    💡 examples: ✔

Page
    📜 documentation: ✔
    💡 examples: ✔

PageActions
    📜 documentation: ✔
    💡 examples: ✔

Pagination
    📜 documentation: ✔
    💡 examples: ✔

Popover
    📜 documentation: ✔
    💡 examples: ✔

PositionedOverlay
    📜 documentation: ✘
    💡 examples: ✘

RadioButton
    📜 documentation: ✔
    💡 examples: ✔

ResourceList
    📜 documentation: ✔
    💡 examples: ✔

Scrollable
    📜 documentation: ✔
    💡 examples: ✔

Select
    📜 documentation: ✔
    💡 examples: ✔

SettingAction
    📜 documentation: ✔
    💡 examples: ✘

SettingToggle
    📜 documentation: ✔
    💡 examples: ✔

SkeletonBodyText
    📜 documentation: ✔
    💡 examples: ✔

SkeletonDisplayText
    📜 documentation: ✔
    💡 examples: ✔

SkeletonPage
    📜 documentation: ✔
    💡 examples: ✔

Spinner
    📜 documentation: ✔
    💡 examples: ✔

Stack
    📜 documentation: ✔
    💡 examples: ✔

Subheading
    📜 documentation: ✔
    💡 examples: ✔

Tabs
    📜 documentation: ✔
    💡 examples: ✔

Tag
    📜 documentation: ✔
    💡 examples: ✔

TextContainer
    📜 documentation: ✘
    💡 examples: ✘

TextField
    📜 documentation: ✔
    💡 examples: ✔

TextStyle
    📜 documentation: ✔
    💡 examples: ✔

Thumbnail
    📜 documentation: ✔
    💡 examples: ✔

Tooltip
    📜 documentation: ✔
    💡 examples: ✔

UnstyledLink
    📜 documentation: ✘
    💡 examples: ✘

VisuallyHidden
    📜 documentation: ✔
    💡 examples: ✔`);
        });
    });
  });
});
