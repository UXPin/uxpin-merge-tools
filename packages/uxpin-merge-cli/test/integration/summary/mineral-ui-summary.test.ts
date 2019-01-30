import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { mineralUiSummaryStub } from '../../resources/stubs/mineralUi';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getRandomPortNumber } from '../../utils/e2e/server/getRandomPortNumber';
import { ADMIN_PORT_RANGE, startStubbyServer, STUBS_PORT_RANGE, TLS_PORT_RANGE } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  let server:any;
  let tlsPort:number;

  beforeAll(async () => {
    tlsPort = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);
    server = await startStubbyServer({
      admin: getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max),
      data: mineralUiSummaryStub.requests,
      stubs: getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max),
      tls: tlsPort,
    });
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  describe('summary command prints ', () => {
    it('prints the list of components found in mineral-ui example', async () => {
      // when
      const output:string = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [
          Command.SUMMARY,
        ],
      });

      // then
      expect(output).toContain(
        `General

    Avatar
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Button
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Dropdown
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Link
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Popover
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Select
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Text
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    TextArea
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    TextInput
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✔

    Tooltip
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Checkbox
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CheckboxGroup
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    FormField
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    FormFieldDivider
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    FormFieldset
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Menu
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    MenuDivider
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    MenuGroup
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    MenuItem
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Radio
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    RadioGroup
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

Card

    Card
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardActions
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardBlock
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardDivider
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    CardFooter
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardImage
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardStatus
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardTitle
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    CardTitleMenu
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

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
        🎛  presets: ✔

    StartEnd
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Flex
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    FlexItem
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    Grid
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔

    GridItem
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✔
`);
    });
  });
});
