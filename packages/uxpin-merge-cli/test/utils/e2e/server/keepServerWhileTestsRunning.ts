import { CmdOptions } from '../../command/CmdOptions';
import { startUXPinMergeServer, TestServerOptions } from '../../command/startUXPinMergeServer';

export function keepServerWhileTestsRunning(cmdOptions: CmdOptions, options: TestServerOptions): void {
  let closeServer: () => void;
  beforeAll(async () => {
    const { close } = await startUXPinMergeServer(cmdOptions, options);
    closeServer = close;
  });

  afterAll(() => closeServer());
}
