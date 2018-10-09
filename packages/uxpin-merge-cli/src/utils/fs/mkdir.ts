import mkdirpPromise = require('mkdirp-promise');

export const mkdir:(pattern:string, options?:{ mode:string; }) => Promise<string> = mkdirpPromise;
