import debug from 'debug';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { createComponentsLibrary } from './library/createComponentsLibrary';

const log = debug('uxpin');

export async function buildDesignSystem(components: ComponentDefinition[], options: BuildOptions): Promise<void> {
  log(`Create component library (${components.length} components)...`);
  await createComponentsLibrary(components, options);
  log('Bundle design system library with Webpack...');
  await bundle(options);
}

function bundle(options: BuildOptions): Promise<void> {
  setNodeEnvironment(options.development);
  return getCompiler(options).compile();
}

function setNodeEnvironment(development = false): void {
  process.env.NODE_ENV = development ? 'development' : 'production';
}
