import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { encodeBranchName } from './params/encodeBranchName';

export const enum RepositoryPointerType {
    Branch = 'branch',
    Tag = 'tag',
}

export async function DeleteRepositoryPointerToBranch(
    opts:{
        apiDomain:string,
        authToken:string,
        branch:string,
        commitHash:string,
    }
)