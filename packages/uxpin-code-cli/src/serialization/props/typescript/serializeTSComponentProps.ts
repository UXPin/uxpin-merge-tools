import { toPairs } from 'lodash';
import { parse as parsePath } from 'path';
import { ComponentDoc, parse, PropItem } from 'react-docgen-typescript/lib';
import { ComponentPropertyDefinition, PropertyTypeName } from '../ComponentPropertyDefinition';
import { ComponentPropsList } from '../ComponentPropsList';
import { PropsSerializationResult } from '../PropsSerializationResult';
import { convertTypeName } from './type/convertTypeName';

export function serializeTSComponentProps(componentFileLocation:string):Promise<PropsSerializationResult> {
  return new Promise((resolve) => {
    const props:ComponentPropsList = toPairs(getDefaultComponentFrom(componentFileLocation).props)
      .map(([propName, propType]) => propItemToPropDefinition(propName, propType));
    resolve({ props, warnings: [] });
  });
}

function propItemToPropDefinition(propName:string, propType:PropItem):ComponentPropertyDefinition {
  const propTypeName:PropertyTypeName = convertTypeName(propType.type.name);
  return {
    description: propType.description,
    isRequired: propType.required,
    name: propName,
    type: {
      name: propTypeName,
      structure: {},
    },
  };
}

function getDefaultComponentFrom(filePath:string):ComponentDoc {
  const components:ComponentDoc[] = parse(filePath);
  const expectedComponentName:string = parsePath(filePath).name;
  const nameRegex:RegExp = new RegExp(expectedComponentName, 'i');
  const component:ComponentDoc | undefined = components.find((c) => nameRegex.test(c.displayName));
  if (component) {
    return component;
  }
  throw new Error(`Cannot find ${expectedComponentName} component in ${filePath}`);
}
