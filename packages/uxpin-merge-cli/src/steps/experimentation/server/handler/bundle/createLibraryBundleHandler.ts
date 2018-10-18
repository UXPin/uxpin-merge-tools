import { OutgoingHttpHeaders } from 'http';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { StaticFileHandler } from '../file/StaticFileHandler';

export function createLibraryBundleHandler(context:ExperimentationServerContext):StaticFileHandler {
  const headers:OutgoingHttpHeaders = {
    'Content-Type': 'application/javascript',
    ...getNoCacheHeaders(),
    ...getAccessControlHeaders(context.uxpinDomain),
  };
  return new StaticFileHandler(context.bundlePath, headers);
}
