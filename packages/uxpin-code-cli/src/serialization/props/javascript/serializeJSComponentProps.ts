import fsReadfilePromise = require('fs-readfile-promise');
import { isEmpty, toPairs } from 'lodash';
import { parse } from 'react-docgen';
import { ComponentDoc, PropItem } from 'react-docgen-typescript/lib';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { PropsSerializationResult } from '../PropsSerializationResult';
import { parseValue } from './defaultValue/parseValue';
import { convertPropertyType } from './type/convertPropertyType';

export function serializeJSComponentProps(componentFileLocation:string):Promise<PropsSerializationResult> {
  return getDefaultComponentFrom(componentFileLocation).then((component:ComponentDoc) => {
    return Promise.all(
      toPairs(component.props).map(([propName, propType]) => propItemToPropDefinition(propName, propType)));
  }).then((props) => {
    return { props, warnings: [] };
  });
}

function propItemToPropDefinition(propName:string, propItem:PropItem):Promise<ComponentPropertyDefinition> {
  const definition:ComponentPropertyDefinition = {
    description: propItem.description,
    isRequired: propItem.required,
    name: propName,
    type: convertPropertyType(propItem.type),
  };

  if (propItem.defaultValue) {
    return parseValue(propItem.defaultValue.value).then((value:any) => {
      definition.defaultValue = { value };
      return definition;
    });
  }
  return Promise.resolve(definition);
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
