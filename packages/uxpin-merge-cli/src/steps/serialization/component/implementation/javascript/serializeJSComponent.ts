import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateProps } from '../../../validation/validateProps';
import { getComponentNameFromPath } from '../../name/getComponentNameFromPath';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { ComponentNamespace } from './../../ComponentDefinition';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getComponentNamespaceFromDescription } from './getComponentNamespaceFromDescription';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  return getDefaultComponentFrom(component.path)
    .then(thunkGetMetadata(component))
    .then(thunkGetSummaryResult(component.path));
}

function thunkGetMetadata(implInfo:ComponentImplementationInfo):(parsed:ComponentDoc) => Promise<PartialResult> {
  return (parsed) => Promise.all(toPairs(parsed.props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType)))
    .then(validateProps)
    .then((properties) => {
      const name:string = getComponentNameFromPath(implInfo.path);
      return {
        name,
        namespace: getComponentNamespaceFromDescription(name, parsed.description),
        properties,
      };
    });
}

function thunkGetSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ name, namespace, properties }) => ({
    result: { name, namespace, properties: properties.map((p) => p.result) },
    warnings: joinWarningLists(properties.map((p) => p.warnings), path),
  });
}

interface PartialResult {
  name:string;
  namespace?:ComponentNamespace;
  properties:PropDefinitionSerializationResult[];
}
