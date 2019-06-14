import { ParserOptions } from '@babel/parser';
import { ComponentDoc } from 'react-docgen-typescript/lib';

export declare function parse(
  source:string,
  resolver?:() => void | undefined,
  handlers?:Handler[] | undefined,
  options?:ReactDocgenOptions | undefined,
):ComponentDoc;

export declare type Handler = (doc:any, path:string) => void;
export declare type Resolver = () => void | undefined;

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
