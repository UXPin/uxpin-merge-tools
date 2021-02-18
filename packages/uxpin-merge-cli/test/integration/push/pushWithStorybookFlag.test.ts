import { pathExists } from 'fs-extra';
import { join as joinPath } from 'path';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';

import { STORYBOOK_OUTPUT_DIR } from '../../../src/common/constants';
import { LIBRARY_OUTPUT_FILENAME, TEMP_DIR_PATH } from '../../../src/steps/building/config/getConfig';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { testDirPath } from '../../utils/resources/testDirPath';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT:number = 750000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);
const PROJECT_DIR:string = joinPath(testDirPath, 'resources/repos/storybook-design-system');
const UXPIN_TEMP_DIR:string = joinPath(PROJECT_DIR, TEMP_DIR_PATH);
const UXPIN_STORYBOOK_ADDON:string = '@uxpin/merge-storybook-preset-addon';

describe('Push repos/storybook-design-system with --storybook flag', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);

  it (`${UXPIN_STORYBOOK_ADDON} is installed(linked)`, () => {
    // @ts-ignore
    const addonPath:string = require.resolve(UXPIN_STORYBOOK_ADDON, { paths: [joinPath(PROJECT_DIR, 'node_modules')] });
    expect(addonPath).toBe(joinPath(PROJECT_DIR, 'node_modules', UXPIN_STORYBOOK_ADDON, 'preset.js'));
  });

  it ('generate merge and storybook artifacts', async () => {
    await runUXPinMergeCommand({
      cwd: 'resources/repos/storybook-design-system',
      env: {
        UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
        UXPIN_ENV: Environment.TEST,
      },
      params: [
        Command.PUSH,
        '--storybook',
        '--config="./uxpin.config.js"',
        '--token DUMMY_TOKEN',
      ],
    });

    const mergeOutputExists:boolean = await pathExists(joinPath(UXPIN_TEMP_DIR, LIBRARY_OUTPUT_FILENAME));
    const storybookOutputExists:boolean = await pathExists(joinPath(UXPIN_TEMP_DIR, STORYBOOK_OUTPUT_DIR));
    expect(mergeOutputExists).toBeTruthy();
    expect(storybookOutputExists).toBeTruthy();
  });
});
