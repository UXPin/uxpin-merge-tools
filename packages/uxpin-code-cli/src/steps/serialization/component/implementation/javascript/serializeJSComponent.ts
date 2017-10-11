import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponent(componentFileLocation:string):Promise<ImplSerializationResult> {
  return getDefaultComponentFrom(componentFileLocation)
    .then(serializeProperties)
    .then(getSummaryResult(componentFileLocation));
}

function serializeProperties(component:ComponentDoc):Promise<PartialResult> {
  return Promise.all(toPairs(component.props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType)))
    .then((properties) => ({ name: component.displayName, properties }));
}

function getSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ name, properties }) => ({
    result: { name, properties: properties.map((p) => p.result) },
    warnings: joinWarningLists(properties.map((p) => p.warnings), path),
  });
}

interface PartialResult {
  name:string;
  properties:PropDefinitionSerializationResult[];
}
