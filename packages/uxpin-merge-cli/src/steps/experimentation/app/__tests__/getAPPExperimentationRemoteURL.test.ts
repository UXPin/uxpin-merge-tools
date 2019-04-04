import { ExperimentationServerOptions } from '../../server/startExperimentationServer';
import { getAPPExperimentationRemoteURL } from '../getAPPExperimentationRemoteURL';

describe('getAPPExperimentationRemoteURL', () => {
  it('should return url with ngrokSessionId if provided', () => {
    // having
    const options:ExperimentationServerOptions = {
      bundlePath: '',
      epid: {
        revisionId: 'abc_123',
      },
      ngrokSessionId: 'sessionId',
      port: 1234,
      projectRoot: '',
      skipBrowser: true,
      uxpinDirPath: '',
      uxpinDomain: 'uxpin.com',
    };

    // when
    const url:string = getAPPExperimentationRemoteURL(options);

    // then
    expect(url).toEqual('https://app.uxpin.com/experiment/abc_123?ngrok_session=sessionId');
  });

  it('should return url with port if ngrokSessionId is not provided', () => {
    // having
    const options:ExperimentationServerOptions = {
      bundlePath: '',
      epid: {
        revisionId: 'abc_123',
      },
      ngrokSessionId: null,
      port: 1234,
      projectRoot: '',
      skipBrowser: true,
      uxpinDirPath: '',
      uxpinDomain: 'uxpin.com',
    };

    // when
    const url:string = getAPPExperimentationRemoteURL(options);

    // then
    expect(url).toEqual('https://app.uxpin.com/experiment/abc_123?port=1234');
  });
});
