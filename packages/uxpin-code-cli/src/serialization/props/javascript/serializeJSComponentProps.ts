import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../common/warning/joinWarningLists';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { PropsSerializationResult } from '../PropsSerializationResult';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponentProps(componentFileLocation:string):Promise<PropsSerializationResult> {
  return getDefaultComponentFrom(componentFileLocation).then((component:ComponentDoc) => {
    return Promise.all(
      toPairs(component.props).map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType)));
  }).then((propResults:PropDefinitionSerializationResult[]) => {
    return {
      props: propResults.map((p) => p.definition),
      warnings: joinWarningLists(propResults.map((p) => p.warnings), componentFileLocation),
    };
  });
}
