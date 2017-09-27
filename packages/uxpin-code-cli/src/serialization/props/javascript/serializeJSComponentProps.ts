import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../common/warning/joinWarningLists';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { PropsSerializationResult } from '../PropsSerializationResult';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponentProps(componentFileLocation:string):Promise<PropsSerializationResult> {
  return getDefaultComponentFrom(componentFileLocation)
    .then(serializeProperties)
    .then(getSummaryResult(componentFileLocation));
}

function serializeProperties(component:ComponentDoc):Promise<PropDefinitionSerializationResult[]> {
  return Promise.all(toPairs(component.props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType)));
}

function getSummaryResult(path:string):(propResults:PropDefinitionSerializationResult[]) => PropsSerializationResult {
  return (propResults) => ({
    result: propResults.map((p) => p.result),
    warnings: joinWarningLists(propResults.map((p) => p.warnings), path),
  });
}
