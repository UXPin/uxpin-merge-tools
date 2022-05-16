import { DeleteVersionArgs } from "../../args/ProgramArgs";
import { Step } from '../Step';
import { DeleteOptions } from "../../../steps/deleting/DeleteOptions";
import { getDeleteOptions } from "./getDeleteOptions";
import { DeleteRepositoryPointer } from "./steps/DeleteRepositoryPointer";

export function getDeleteVersionCommandSteps(args:DeleteVersionArgs):Step[] {
    const deleteOptions:DeleteOptions = getDeleteOptions(args);

    return [
        { exec: DeleteRepositoryPointer(deleteOptions), shouldRun: true }
    ]
}