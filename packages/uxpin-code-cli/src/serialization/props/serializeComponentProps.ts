import { toPairs } from 'lodash';
import { parse as parsePath } from 'path';
import { ComponentDoc, parse, PropItem } from 'react-docgen-typescript/lib';
import { ComponentPropertyDefinition, PropertyTypeName, PropertyTypeStructureMap } from './ComponentPropertyDefinition';
import { ComponentPropsList } from './ComponentPropsList';

export function serializeComponentProps(componentFileLocation:string):Promise<ComponentPropsList> {
  return new Promise((resolve) => {
    const props:ComponentPropsList = toPairs(getDefaultComponentFrom(componentFileLocation).props)
      .map(([propName, propType]) => propItemToPropDefinition(propName, propType));
    resolve(props);
  });
}

function propItemToPropDefinition(propName:string, propType:PropItem):ComponentPropertyDefinition {
  const propTypeName:PropertyTypeName = propType.type.name as PropertyTypeName;
  const definition:ComponentPropertyDefinition = {
    description: propType.description,
    isRequired: propType.required,
    name: propName,
    type: {
      name: propTypeName,
      structure: getTypeStructure(propTypeName, propType.type.value),
    },
  };
  if (propType.defaultValue) {
    definition.defaultValue = { value: propType.defaultValue };
  }
  return definition;
}

function getTypeStructure<T extends PropertyTypeName>(name:T, typeValue:any):PropertyTypeStructureMap[T] {
  return { typeValue: typeValue as PropertyTypeStructureMap[T] };
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
