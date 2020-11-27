import { BuiltInWrappers } from './ComponentWrapper';

export function isBuiltInWrapper(name:string):name is BuiltInWrappers {
  // @ts-ignore
  return Object.values(BuiltInWrappers).includes(name);
}
