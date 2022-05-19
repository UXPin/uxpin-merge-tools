import { getDefaultApiDomain } from '../../../../src/common/services/UXPin/getDefaultApiDomain';
import { DeleteOptions } from '../../../steps/deleting/DeleteOptions';
import { DeleteVersionArgs } from '../../args/ProgramArgs';
import { getProjectRoot } from '../../args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../args/providers/paths/getTempDirPath';

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
