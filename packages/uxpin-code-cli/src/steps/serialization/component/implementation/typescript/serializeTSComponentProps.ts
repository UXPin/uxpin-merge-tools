import { toPairs } from 'lodash';
import { parse as parsePath } from 'path';
import { ComponentDoc, parse, PropItem } from 'react-docgen-typescript/lib';
import { ComponentPropertyDefinition, PropertyTypeName } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { convertTypeName } from './type/convertTypeName';

export function serializeTSComponent(componentFileLocation:string):Promise<ImplSerializationResult> {
  return new Promise((resolve) => {
    const componentDoc:ComponentDoc = getDefaultComponentFrom(componentFileLocation);
    const result:ComponentPropertyDefinition[] = toPairs(componentDoc.props)
      .map(([propName, propType]) => propItemToPropDefinition(propName, propType));
    resolve({
      result: {
        name: componentDoc.displayName,
        properties: result,
      },
      warnings: [],
    });
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
  let components:ComponentDoc[];
  try {
    components = parse(filePath);
  } catch (e) {
    components = [];
  }
  const expectedComponentName:string = parsePath(filePath).name;
  const nameRegex:RegExp = new RegExp(expectedComponentName, 'i');
  const component:ComponentDoc | undefined = components.find((c) => nameRegex.test(c.displayName));
  if (component) {
    return component;
  }
  throw new Error(`No \`${expectedComponentName}\` component found in ${filePath}`);
}
