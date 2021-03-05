export const DEFAULT_CONFIG_PATH:string = './uxpin.config.js';
export const DEFAULT_UXPIN_DOMAIN:string = 'uxpin.com';

export const DEFAULT_BRANCH_NAME:string = 'master';

export const HEAD_REF_NAME:string = 'HEAD';

export const SHORT_COMMIT_HASH_IDX:number = 7;

export const BYTES_PER_KB:number = 1024;
export const KB_PER_MB:number = 1000;
export const BYTES_PER_MB:number = KB_PER_MB * BYTES_PER_KB;

export const DEFAULT_STDOUT_BUFFER_SIZE_MB:number = 10;
export const DEFAULT_STDOUT_BUFFER_SIZE_BYTES:number = DEFAULT_STDOUT_BUFFER_SIZE_MB * BYTES_PER_MB;

export const STORYBOOK_DEFAULT_CONFIG_DIR:string = './.storybook';
export const STORYBOOK_CONFIG_FILE:string = 'main.js';
export const STORYBOOK_UXPIN_CONFIG_PATH:string = './.uxpin-merge/uxpin.config.js';
export const STORYBOOK_STORIES_MAP_PATH:string = './.uxpin-merge/componentsStoriesMap.js';
export const STORYBOOK_OUTPUT_DIR:string = 'merge-cli-storybook-build';
export const STORYBOOK_BUILD_ENV:string = 'BUILD_STORYBOOK_WITH_UXPIN_MERGE=true';
