declare module 'terminate';

declare function terminate(pid:number, callback:(err:NodeJS.ErrnoException) => void):void;

export = terminate;
