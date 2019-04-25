import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeAsUnsupportedType(declaration:ts.Type):PropertyType<'unsupported'> {
  return {
    name: 'unsupported',
    structure: {
      raw: getUnsuportedTypeValue(declaration.flags).toLowerCase()
    },
  };
}

function getUnsuportedTypeValue(typeFlag:number):string{
  const nameOfUnsuportedType = Object.keys(ts.TypeFlags).find(key => ts.TypeFlags[key] === typeFlag);
  if(nameOfUnsuportedType){
    return nameOfUnsuportedType;
  }
  return 'unknown type'
}
