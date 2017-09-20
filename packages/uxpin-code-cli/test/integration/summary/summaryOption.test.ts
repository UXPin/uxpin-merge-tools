import { runUXPinCodeCommand } from '../../utils/runUXPinCodeCommand';

beforeAll(() => jest.setTimeout(15000));
afterAll(() => jest.setTimeout(5000);

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

    it('prints the list of components found in nordnet-ui-kit example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`components/alert
components/animate
components/avatar
components/badge
components/button
components/dropdown
components/flag
components/icon
components/input
components/labeled-value
components/li
components/logo
components/pane
components/radio-group
components/segmented-control
components/spinner
components/table
components/tbody\n` + // no examples
`components/td\n` + // no examples
`components/tfoot\n` + // no examples
`components/th\n` + // no examples
`components/thead\n` + // no examples
`components/tooltip
components/tr\n` + // no examples
`components/ul`);
        });
    });

    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/polaris', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`components/AccountConnection
components/ActionList
components/Avatar
components/Badge
components/Banner
components/Breadcrumbs
components/Button
components/ButtonGroup
components/CalloutCard
components/Caption
components/Card
components/Checkbox
components/Choice
components/ChoiceList
components/Collapsible
components/ColorPicker
components/Connected
components/DatePicker
components/DescriptionList
components/DisplayText
components/EmptyState
components/EventListener
components/FooterHelp
components/FormLayout
components/Heading
components/Icon
components/Image
components/KeyboardKey
components/KeypressListener
components/Label
components/Labelled
components/Layout
components/Link
components/List
components/Page
components/PageActions
components/Pagination
components/Popover
components/PositionedOverlay
components/RadioButton
components/ResourceList
components/Scrollable
components/Select
components/SettingAction
components/SettingToggle
components/Stack
components/Subheading
components/Tabs
components/Tag
components/TextContainer
components/TextField
components/TextStyle
components/Thumbnail
components/Tooltip
components/UnstyledLink
components/VisuallyHidden`);
        });
    });
  });
});
