import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export async function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<void> {
  await createComponentsLibrary(components, options);

  if (options && options.storybook) {
    // Do storybook stuff
    // TODO: Figure out the root directory

    // TODO: Call storybook itself, with uxpin-merge CLI as a dep?

    // TODO: uxpin-merge invocation from inside storybook writes out the config we need from storybook

    // TODO: (alternatively) uxpin-merge just calls storybook to build the config? slurps the output from
    // build-storybook --debug-webpack or start-storybook --debug-webpack

    // TODO: uxpin-merge
  }

  await bundle(options);
}

function bundle(options:BuildOptions):Promise<void> {
  setNodeEnvironment(options.development);

  return getCompiler(options).compile();
}

function setNodeEnvironment(development:boolean = false):void {
  process.env.NODE_ENV = development ? 'development' : 'production';
}
