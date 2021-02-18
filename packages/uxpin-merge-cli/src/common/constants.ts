export const DEFAULT_BRANCH_NAME:string = 'master';

export const HEAD_REF_NAME:string = 'HEAD';

export const SHORT_COMMIT_HASH_IDX:number = 7;

export const BYTES_PER_KB:number = 1024;
export const KB_PER_MB:number = 1000;
export const BYTES_PER_MB:number = KB_PER_MB * BYTES_PER_KB;

export const DEFAULT_STDOUT_BUFFER_SIZE_MB:number = 10;
export const DEFAULT_STDOUT_BUFFER_SIZE_BYTES:number = DEFAULT_STDOUT_BUFFER_SIZE_MB * BYTES_PER_MB;

export const STORYBOOK_OUTPUT_DIR:string = 'merge-cli-storybook-build';
export const STORYBOOK_BUILD_ENV:string = 'BUILD_STORYBOOK_WITH_UXPIN_MERGE=true';
