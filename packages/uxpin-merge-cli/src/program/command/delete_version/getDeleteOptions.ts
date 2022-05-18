import { isDevelopmentEnv } from '../../../program/env/isDevelopmentEnv';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { DeleteOptions } from '../../../steps/deleting/DeleteOptions';
import { DeleteVersionArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';

const TEST_UXPIN_API_DOMAIN:string = '0.0.0.0';

function getDefaultApiDomain(domain:string):string {
  return isTestEnv() || isDevelopmentEnv()
        ? process.env.UXPIN_API_DOMAIN || TEST_UXPIN_API_DOMAIN
        : `api.${domain}`;
}

export function getDeleteOptions(args:DeleteVersionArgs):DeleteOptions {
  const { token, uxpinDomain, branch, tag } = args;

  return {
    branch,
    projectRoot: getProjectRoot(args),
    tag,
    token,
    uxpinApiDomain: getDefaultApiDomain(uxpinDomain!),
    uxpinDirPath: getTempDirPath(args),
    uxpinDomain,
  };
}

export type DeleteArgs = Pick<DeleteVersionArgs, 'cwd' | 'token' | 'uxpinDomain'
| 'branch' | 'tag'>;
