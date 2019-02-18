declare module 'stubby' {
  interface StubbyOptions {
    stubs?:number;
    admin?:number;
    tls?:number;
    data?:Object|Array;
    location?:string;
    key?:string;
    cert?:string;
    pfx?:string;
    watch?:string;
    quiet?:boolean;
    _httpsOptions?:any;
  };

  interface StubbyStub {
    request:StubbyRequest;
    response:StubbyResponse;
  }

  interface StubbyRequest {
    [key:string]:any;
  }

  interface StubbyResponse {
    [key:string]:any;
  }

  declare class Stubby {
    constructor();
    start(options:StubbyOptions, callback:(error:any) => void):void;
    stop(callback:(error:any) => void):void;
    [key:string]:any;
  }
};
