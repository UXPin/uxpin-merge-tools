import { Command } from '../../../src';
import { TEMP_DIR_NAME } from '../../../src/steps/building/config/getConfig';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runCommand } from '../../utils/command/runCommand';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { startStubbyServer } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 60000;
const STUBBY_PORT:number = 7450;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building designSystems/cantWriteToUxpinTemp design system', () => {
  const DEFAULT_PERMISSIONS:string = '755';
  const READONLY_PERMISSIONS:string = '444';
  const workingDir:string = 'resources/designSystems/cantWriteToUxpinTemp';
  const uxpinTempPath:string = `test/${workingDir}/${TEMP_DIR_NAME}`;
  let server:any;

  beforeAll(async () => {
    server = await startStubbyServer({
      data: emptyLatestCommitStub.requests,
      tls: STUBBY_PORT,
    });
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  const chmod:(path:string, mode:string) => Promise<string> = (path, mode) => runCommand(`chmod ${mode} ${path}`);

  afterEach(() => {
    return chmod(uxpinTempPath, DEFAULT_PERMISSIONS);
  });

  it('shows permission denied Error when can not write to temporary directory', async () => {
    await chmod(uxpinTempPath, READONLY_PERMISSIONS);
    await expect(runUXPinMergeCommand({ cwd: workingDir, params: [
      Command.PUSH,
      `--uxpin-api-domain "0.0.0.0:${STUBBY_PORT}"`,
    ] }))
      .rejects.toMatch('EACCES: permission denied');
  });
});
