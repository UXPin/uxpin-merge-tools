import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { polarisSummaryStub } from '../../resources/stubs/polaris';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getRandomPortNumber } from '../../utils/e2e/server/getRandomPortNumber';
import { startStubbyServer, TLS_PORT_RANGE, ADMIN_PORT_RANGE, STUBS_PORT_RANGE } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 150000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe.only('summary command integration', () => {
  let server:any;
  let tlsPort:number;

  beforeAll(async () => {
    tlsPort = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);
    server = await startStubbyServer({
      admin: getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max),
      data: polarisSummaryStub.requests,
      stubs: getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max),
      tls: tlsPort,
    });
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  describe('summary command prints ', () => {
    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/polaris',
        env: {
          NODE_ENV: Environment.TEST,
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        },
        params: [
          Command.SUMMARY,
          '--config="../../configs/polaris-uxpin.config.js"',
        ],
      })
        .then((output) => {
          // then
          expect(output).toContain(`Uncategorized

    AccountConnection
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    ActionList
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Avatar
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Badge
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Banner
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Breadcrumbs
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

    CalloutCard
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Caption
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Card
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Checkbox
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Choice
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    ChoiceList
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Collapsible
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    ColorPicker
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Connected
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    DatePicker
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    DescriptionList
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    DisplayText
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    EmptyState
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    FooterHelp
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    FormLayout
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Heading
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Icon
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Image
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    KeyboardKey
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    labelID
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Labelled
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    Layout
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Link
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    List
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Page
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    PageActions
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

    PositionedOverlay
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    RadioButton
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    ResourceList
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Scrollable
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Select
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    SettingAction
        📜 documentation: ✔
        💡 examples: ✘
        🎛  presets: ✘

    SettingToggle
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    SkeletonBodyText
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    SkeletonDisplayText
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    SkeletonPage
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Spinner
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Stack
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Subheading
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Tabs
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Tag
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    TextContainer
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    TextField
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    TextStyle
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Thumbnail
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    Tooltip
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘

    UnstyledLink
        📜 documentation: ✘
        💡 examples: ✘
        🎛  presets: ✘

    VisuallyHidden
        📜 documentation: ✔
        💡 examples: ✔
        🎛  presets: ✘`);
        });
    });
  });
});
