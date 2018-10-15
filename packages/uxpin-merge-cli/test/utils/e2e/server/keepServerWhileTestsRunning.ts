import { CmdOptions } from '../../command/CmdOptions';
import { startUXPinMergeServer } from '../../command/startUXPinMergeServer';

export function keepServerWhileTestsRunning(options:CmdOptions):void {
  let closeServer:() => void;
  beforeAll((done) => {
    return startUXPinMergeServer(options).then((close) => {
      closeServer = close;
      done();
    });
  });

  afterAll(() => closeServer());
}
