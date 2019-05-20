import { ParserOptions } from '@babel/parser';
import { ComponentDoc } from 'react-docgen-typescript/lib';

export declare function parse(
  source:string,
  resolver?:() => void | undefined,
  handlers?:Handler[] | undefined,
  options?:ReactDocgenOptions | undefined,
):ComponentDoc;

export declare type Handler = (doc:any, path:string) => void;
export declare type Resolver = (ast:any, recast:object) => any;

export declare const defaultHandlers:Handler[];

export interface ReactDocgenOptions {
  cwd?:string;
  filename?:string;
  parserOptions?:ParserOptions;
}
