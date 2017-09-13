import fsReadfilePromise = require('fs-readfile-promise');
import { isEmpty, toPairs } from 'lodash';
import { parse } from 'react-docgen';
import { ComponentDoc, PropItem } from 'react-docgen-typescript/lib';
import { ComponentPropertyDefinition, PropertyTypeName, } from '../ComponentPropertyDefinition';
import { ComponentPropsList } from '../ComponentPropsList';
import { convertTypeName } from './type/convertTypeName';
import { convertTypeStructure } from './type/structure/convertTypeStructure';

export function serializeJSComponentProps(componentFileLocation:string):Promise<ComponentPropsList> {
  return getDefaultComponentFrom(componentFileLocation).then((component:ComponentDoc) => {
    return toPairs(component.props).map(([propName, propType]) => propItemToPropDefinition(propName, propType));
  });
}

function propItemToPropDefinition(propName:string, propType:PropItem):ComponentPropertyDefinition {
  const propTypeName:PropertyTypeName = convertTypeName(propType.type.name);
  const definition:ComponentPropertyDefinition = {
    description: propType.description,
    isRequired: propType.required,
    name: propName,
    type: {
      name: propTypeName,
      structure: convertTypeStructure(propTypeName, propType.type.value),
    },
  };
  if (propType.defaultValue) {
    definition.defaultValue = { value: propType.defaultValue.value };
  }
  return definition;
}

function getDefaultComponentFrom(filePath:string):Promise<ComponentDoc> {
  return getFileContents(filePath).then((fileContents:string) => {
    const component:ComponentDoc | undefined = parse(fileContents);
    if (isEmpty(component)) {
      throw new Error(`Cannot find default exported component in ${filePath}`);
    }
    return component;
  });
}

function getFileContents(filePath:string):Promise<string> {
  return fsReadfilePromise(filePath, { encoding: 'utf8' });
}
