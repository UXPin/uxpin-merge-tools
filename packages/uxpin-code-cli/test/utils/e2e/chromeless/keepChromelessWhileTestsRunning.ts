import Chromeless from 'chromeless';
import { chromelessNavigateToDebugServerAt } from '../../chromeless/chromelessNavigateToDebugServerAt';

export function keepChromelessWhileTestsRunning(port:number,
  onChromelessReady:(c:Chromeless<any>) => void,
  path?:string):void {
  let chromeless:Chromeless<any>;

  beforeAll((done) => {
    chromelessNavigateToDebugServerAt(port, (c) => {
      chromeless = c;
      onChromelessReady(c);
      done();
    }, path);
  });

  afterAll(() => chromeless.end());
}
