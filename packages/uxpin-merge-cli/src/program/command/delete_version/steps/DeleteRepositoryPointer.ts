import { DeleteTag } from '../../../../common/services/UXPin/DeleteTag';
import { getApiDomain } from '../../../../common/services/UXPin/getApiDomain';
import { DeleteRepositoryPointerToBranch } from '../../../../common/services/UXPin/DeleteRepositoryPointerToBranch';
import { DeleteOptions } from '../../../../steps/deleting/DeleteOptions';
import { DSMetadata } from '../../../../program/DSMeta';
import { VCSDetails } from '../../../../steps/serialization/DesignSystemSnapshot';

export function DeleteRepositoryPointer(deleteOptions:DeleteOptions) {
    return async (designSystem:DSMetadata) => {
        const apiDomain:string = getApiDomain(deleteOptions.uxpinApiDomain!);
        const authToken:string = deleteOptions.token!;
        const vcsDetails:VCSDetails = designSystem.result.vcs;
        const branch:string | undefined = vcsDetails && vcsDetails.branchName;
        const tag:string | undefined = deleteOptions.tag;

        if (tag) {
            await DeleteTagWithPrintMessage({apiDomain, authToken, tag})
            
        }
    }
}

async function DeleteTagWithPrintMessage(opts:{
    apiDomain:string,
    authToken:string,
    tag:string,
}):Promise<void> {
    try {
        console.log('delete tag!')
        await DeleteTag(opts);
    } catch (error) {
        console.log('oh no tag error!')
    }
}