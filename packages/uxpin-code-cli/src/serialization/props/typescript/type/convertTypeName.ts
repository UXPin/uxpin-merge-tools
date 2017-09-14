import { PropertyTypeName } from '../../ComponentPropertyDefinition';

const TYPE_MAP:{ [key:string]:PropertyTypeName } = {
  ReactNode: 'node',
};

export function convertTypeName(reactDocgenType:string):PropertyTypeName {
  return TYPE_MAP[reactDocgenType] || reactDocgenType;
}
