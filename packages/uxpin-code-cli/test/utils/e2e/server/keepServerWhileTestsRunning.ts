import { CmdOptions } from '../../command/CmdOptions';
import { startUXPinCodeServer } from '../../command/startUXPinCodeServer';

export function keepServerWhileTestsRunning(options:CmdOptions):void {
  let closeServer:() => void;
  beforeAll((done) => {
    return startUXPinCodeServer(options).then((close) => {
      closeServer = close;
      done();
    });
  });

  afterAll(() => closeServer());
}
