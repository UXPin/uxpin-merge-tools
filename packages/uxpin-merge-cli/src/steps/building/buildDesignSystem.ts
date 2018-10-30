import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export async function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<void> {
  await createComponentsLibrary(components, options);
  await bundle(options);
}

function bundle(options:BuildOptions):Promise<void> {
  setNodeEnvironment(options.development);
  return getCompiler(options).compile();
}

function setNodeEnvironment(development:boolean = false):void {
  process.env.NODE_ENV = development ? 'development' : 'production';
}
