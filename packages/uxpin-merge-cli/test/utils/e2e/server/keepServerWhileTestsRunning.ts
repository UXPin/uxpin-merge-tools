import { CmdOptions } from '../../command/CmdOptions';
import { startUXPinMergeServer, TestServerOptions } from '../../command/startUXPinMergeServer';

export function keepServerWhileTestsRunning(cmdOptions:CmdOptions, options:TestServerOptions):void {
  let closeServer:() => void;
  beforeAll((done) => {
    return startUXPinMergeServer(cmdOptions, options).then(({ close }) => {
      closeServer = close;
      done();
    });
  });

  afterAll(() => closeServer());
}
