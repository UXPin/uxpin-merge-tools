import { DeleteTag } from '../../../../common/services/UXPin/DeleteTag';
import { getApiDomain } from '../../../../common/services/UXPin/getApiDomain';
import { DeleteRepositoryPointerToBranch } from '../../../../common/services/UXPin/DeleteRepositoryPointerToBranch';
import { DeleteOptions } from '../../../../steps/deleting/DeleteOptions';
import { DSMetadata } from '../../../../program/DSMeta';
import { printError, printLine } from '../../../../utils/console/printLine';
import { VCSDetails } from '../../../../steps/serialization/DesignSystemSnapshot';
import { PrintColor } from '../../../../../src/utils/console/PrintOptions';
import { DEFAULT_BRANCH_NAME } from '../../../../../src/common/constants';

export function DeleteRepositoryPointer(deleteOptions:DeleteOptions) {
    return async (designSystem:DSMetadata) => {
        const apiDomain:string = getApiDomain(deleteOptions.uxpinApiDomain!);
        const authToken:string = deleteOptions.token!;
        const vcsDetails:VCSDetails = designSystem.result.vcs;
        const commitHash:string = vcsDetails.commitHash;
        const branch:string | undefined = vcsDetails && vcsDetails.branchName !== DEFAULT_BRANCH_NAME ? vcsDetails.branchName : undefined;
        const tag:string | undefined = deleteOptions.tag;

        if (!tag && !branch) {
            printError(
                `🛑 Please specify --branch or --tag and the name of the version you would like to delete.`
                );
        }

        if (tag) {
            await DeleteTagWithPrintMessage({
                apiDomain, 
                authToken, 
                commitHash, 
                tag,
            });
        }

        if (branch) {
            await DeleteRepositoryPointerWithPrintMessage({
                apiDomain,
                authToken,
                branch,
                commitHash,
            })
        }
    }
}

async function DeleteTagWithPrintMessage(opts:{
    apiDomain:string,
    authToken:string,
    commitHash:string,
    tag:string,
}):Promise<void> {
        await DeleteTag(opts);
        printLine(
            `🏷️  Library tag version [${opts.tag}] at commit hash [${opts.commitHash}] has been deleted.`,
            {color: PrintColor.YELLOW}
        );
}

async function DeleteRepositoryPointerWithPrintMessage(opts:{
    apiDomain:string,
    authToken:string,
    branch:string,
    commitHash:string,
}):Promise<void> {
    
    await DeleteRepositoryPointerToBranch(opts);
    printLine(
        `Library branch version [${opts.branch}] at commit hash [${opts.commitHash}] has been deleted.`,
        {color: PrintColor.YELLOW}
    )
}