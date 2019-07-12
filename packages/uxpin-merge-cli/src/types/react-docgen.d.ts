import { ParserOptions } from '@babel/parser';
import { ComponentDoc } from 'react-docgen-typescript/lib';

export declare function parse(
  source:string,
  resolver?:Resolver,
  handlers?:Handler[] | undefined,
  options?:ReactDocgenOptions | undefined,
):ComponentDoc | ComponentDoc[];

export declare type Handler = (doc:any, path:string) => void;
export declare type Resolver = (ast:any) => any;

export declare const defaultHandlers:Handler[];

export declare const resolver:Resolvers;

export interface ReactDocgenOptions {
  cwd?:string;
  filename?:string;
  parserOptions?:ParserOptions;
}

export interface Resolvers {
  findAllComponentDefinitions:Resolver;
  findAllExportedComponentDefinitions:Resolver;
  findExportedComponentDefinition:Resolver;
}
