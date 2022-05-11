import { DeleteOptions } from "../../../steps/deleting/DeleteOptions";
import { DeleteVersionArgs } from "../../args/ProgramArgs";

export function getDeleteOptions(args:DeleteVersionArgs):DeleteOptions {
    const { token, uxpinDomain, branch, tag } = args;

    return {
        branch,
        tag,
        uxpinDomain,
        token,
    };
}

export type DeleteArgs = Pick<DeleteVersionArgs, 'token' | 'uxpinDomain'
| 'branch' | 'tag'>;