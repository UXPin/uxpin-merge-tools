import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { WarningDetails } from '../../../common/warning/WarningDetails';
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
      warnings: joinWarningLists(componentFileLocation, propResults),
    };
  });
}

function joinWarningLists(componentPath:string, propResults:PropDefinitionSerializationResult[]):WarningDetails[] {
  return propResults.reduce((aggregator, serializationResult) => {
    [].push.apply(aggregator, serializationResult.warnings.map(supplyPathToWarning(componentPath)));
    return aggregator;
  }, [] as WarningDetails[]);
}

function supplyPathToWarning(path:string):(warning:WarningDetails) => WarningDetails {
  return (warning:WarningDetails) => {
    warning.sourcePath = path;
    return warning;
  };
}
