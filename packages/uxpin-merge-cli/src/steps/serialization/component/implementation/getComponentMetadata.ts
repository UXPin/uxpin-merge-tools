import { getParsedImports } from '../../../../utils/getParsedImports';
import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { thunkGetSummaryResultForInvalidComponent } from './getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './ImplSerializationResult';
import { serializeJSComponent } from './javascript/serializeJSComponent';
import { serializeTSComponent } from './typescript/serializeTSComponent';
import {ComponentPropertyDefinition} from "./ComponentPropertyDefinition";
import {ComponentWrapper} from "../wrappers/ComponentWrapper";
import {ComponentNamespace} from "../ComponentDefinition";

export function getComponentMetadata(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  let promise:Promise<ImplSerializationResult>;

  const parsedImports:any = getParsedImports(component.path);
  if (parsedImports.length) {
    const parsedImport:any = parsedImports[0];
    return Promise.resolve({ result: {
      defaultExported: !!parsedImport.defaultImport,
      name: parsedImport.defaultImport || parsedImport.namedImports[0].name,
      properties: [],
    }, warnings: [] });
  }

  if (component.lang === 'typescript') {
    promise = serializeTSComponent(component);
  } else {
    promise = serializeJSComponent(component);
  }
  return promise.catch(thunkGetSummaryResultForInvalidComponent(component.path));
}
