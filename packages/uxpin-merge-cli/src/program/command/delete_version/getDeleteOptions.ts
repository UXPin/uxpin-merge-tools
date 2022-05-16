import { DeleteOptions } from "../../../steps/deleting/DeleteOptions";
import { DeleteVersionArgs } from "../../args/ProgramArgs";
import { isTestEnv } from "../../../program/env/isTestEnv";
import { isDevelopmentEnv } from "../../../program/env/isDevelopmentEnv";
import { getTempDirPath } from "../../args/providers/paths/getTempDirPath";
import { getProjectRoot } from "../../args/providers/paths/getProjectRoot";

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
        uxpinDirPath: getTempDirPath(args),
        uxpinApiDomain: getDefaultApiDomain(uxpinDomain!),
        uxpinDomain,
        token,
    };
}

export type DeleteArgs = Pick<DeleteVersionArgs, 'cwd' | 'token' | 'uxpinDomain'
| 'branch' | 'tag'>;