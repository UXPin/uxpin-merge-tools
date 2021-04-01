import { BuiltInWrappers } from './ComponentWrapper';

export function isBuiltInWrapper(name:string):name is BuiltInWrappers {
  return Object.values(BuiltInWrappers).includes(name);
}
