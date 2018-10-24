declare module 'terminate';

declare function terminate(pid:number, callback:(err?:any) => void):void;

export = terminate;
