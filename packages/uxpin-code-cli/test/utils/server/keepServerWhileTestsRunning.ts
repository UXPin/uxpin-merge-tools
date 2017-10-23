import { startUXPinCodeServer } from '../command/startUXPinCodeServer';

export function keepServerWhileTestsRunning(projectPath:string, options:string):void {
  let closeServer:() => void;
  beforeAll((done) => {
    return startUXPinCodeServer(projectPath, options).then((close) => {
      closeServer = close;
      done();
    });
  });

  afterAll(() => closeServer());
}
