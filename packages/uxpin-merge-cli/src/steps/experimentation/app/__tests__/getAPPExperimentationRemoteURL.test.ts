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
      projectName: 'Uxpin Merge Library',
      projectRoot: '',
      skipBrowser: true,
      uxpinDirPath: '',
      uxpinDomain: 'uxpin.com',
    };

    // when
    const url:string = getAPPExperimentationRemoteURL(options);

    // then
    expect(url).toEqual('https://app.uxpin.com/experiment/abc_123?ngrok_session=sessionId&name=Uxpin Merge Library');
  });

  it('should return url with port if ngrokSessionId is not provided', () => {
    // having
    const options:ExperimentationServerOptions = {
      bundlePath: '',
      epid: {
        revisionId: 'abc_123',
      },
      port: 1234,
      projectName: 'Uxpin Merge Library',
      projectRoot: '',
      skipBrowser: true,
      uxpinDirPath: '',
      uxpinDomain: 'uxpin.com',
    };

    // when
    const url:string = getAPPExperimentationRemoteURL(options);

    // then
    expect(url).toEqual('https://app.uxpin.com/experiment/abc_123?port=1234&name=Uxpin Merge Library');
  });
});
