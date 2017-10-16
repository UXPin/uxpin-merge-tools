import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { getComponentNameFromPath } from '../../name/getComponentNameFromPath';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  return getDefaultComponentFrom(component.path)
    .then(thunkGetMetadata(component))
    .then(thunkGetSummaryResult(component.path));
}

function thunkGetMetadata(implInfo:ComponentImplementationInfo):(parsed:ComponentDoc) => Promise<PartialResult> {
  return (parsed) => Promise.all(toPairs(parsed.props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType)))
    .then((properties) => ({ name: getComponentNameFromPath(implInfo.path), properties }));
}

function thunkGetSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ name, properties }) => ({
    result: { name, properties: properties.map((p) => p.result) },
    warnings: joinWarningLists(properties.map((p) => p.warnings), path),
  });
}

interface PartialResult {
  name:string;
  properties:PropDefinitionSerializationResult[];
}
