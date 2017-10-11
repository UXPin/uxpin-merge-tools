import { toPairs } from 'lodash';
import { parse } from 'path';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { getComponentClassName } from '../../../../building/library/getComponentClassName';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  return getDefaultComponentFrom(component.path)
    .then(getMetadata(component))
    .then(getSummaryResult(component.path));
}

function getMetadata(implInfo:ComponentImplementationInfo):(parsed:ComponentDoc) => Promise<PartialResult> {
  return (parsed) => Promise.all(toPairs(parsed.props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType)))
    .then((properties) => ({ name: getComponentName(implInfo), properties }));
}

function getSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ name, properties }) => ({
    result: { name, properties: properties.map((p) => p.result) },
    warnings: joinWarningLists(properties.map((p) => p.warnings), path),
  });
}

function getComponentName({ path }:ComponentImplementationInfo):string {
  return getComponentClassName(parse(path).name);
}

interface PartialResult {
  name:string;
  properties:PropDefinitionSerializationResult[];
}
