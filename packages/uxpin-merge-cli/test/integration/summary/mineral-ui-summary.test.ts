import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  describe('summary command prints ', () => {
    it('prints the list of components found in mineral-ui example', async () => {
      // when
      const output:string = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        params: [Command.SUMMARY],
      });

      // then
      expect(output).toContain(
        `General

    Avatar
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Button
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    ButtonGroup
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Dropdown
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Link
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Pagination
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Popover
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Select
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Table
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Text
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    TextArea
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    TextInput
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Tooltip
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Checkbox
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CheckboxGroup
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    FormField
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    FormFieldDivider
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    FormFieldset
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Menu
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    MenuDivider
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    MenuGroup
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    MenuItem
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Radio
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    RadioGroup
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Tab
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Tabs
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

Card

    Card
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardActions
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardBlock
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardDivider
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardFooter
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardImage
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardStatus
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardTitle
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardTitleMenu
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

Icons

    Icon
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconArrowDropdownDown
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconArrowDropdownUp
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconCheckBoxCheck
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconCheckBoxIndeterminate
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconChevronLeft
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconChevronRight
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconClose
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconDanger
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconDangerSimple
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconExpandLess
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconExpandMore
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconMoreHoriz
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconRadioButtonCheck
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconSuccess
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconSuccessSimple
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconWarning
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    IconWarningSimple
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

Layout

    Box
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    StartEnd
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Flex
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    FlexItem
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Grid
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    GridItem
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘
`);
    });
  });
});
