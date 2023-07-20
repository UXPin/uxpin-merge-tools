import debug from 'debug';
import { pathExists, readJSON } from 'fs-extra';
import { join } from 'path';
import * as ts from 'typescript';

import { ComponentImplementationInfo, TypeScriptConfig } from '../discovery/component/ComponentInfo';
import { thunkGetSummaryResultForInvalidComponent } from './component/implementation/getSummaryResultForInvalidComponent';
import { ImplSerializationResult } from './component/implementation/ImplSerializationResult';
import { serializeJSComponent } from './component/implementation/javascript/serializeJSComponent';
import { createTSProgram } from './component/implementation/typescript/context/getSerializationContext';
import { serializeTSComponentWithContext } from './component/implementation/typescript/serializeTSComponent';

const log = debug('uxpin:serialization');

interface AbstractSerializer {
  serialize(component: ComponentImplementationInfo): Promise<ImplSerializationResult>;
}

export class MergeComponentSerializer implements AbstractSerializer {
  components: ComponentImplementationInfo[];
  program?: ts.Program;

  constructor(components: ComponentImplementationInfo[]) {
    this.components = components;
  }

  public async init() {
    await this.tsSetup();
  }

  private async tsSetup() {
    const tsComponentsPaths = this.components
      .filter((component) => component.lang === 'typescript')
      .map((component) => component.path);
    if (tsComponentsPaths.length === 0) return;

    const config = await getTypeScriptConfig();

    // this is an expensive operation, we do it once passing all the paths rather than calling it for each component
    this.program = createTSProgram(tsComponentsPaths, config);
  }

  public serialize(component: ComponentImplementationInfo) {
    return this.serializeImplementation(component).catch(thunkGetSummaryResultForInvalidComponent(component.path));
  }

  public async serializeImplementation(component: ComponentImplementationInfo) {
    if (component.lang === 'typescript') {
      if (!this.program) throw new Error(`TS program should have been initialized`);
      log(`TS`, component.path);
      return serializeTSComponentWithContext(component, this.program);
    } else {
      log('JS', component.path);
      return serializeJSComponent(component);
    }
  }
}

// Read the local TS config to take into account `paths` option used for absolute imports
async function getTypeScriptConfig(): Promise<TypeScriptConfig | undefined> {
  const configFilepath = join(process.cwd(), 'tsconfig.json');
  const exists = await pathExists(configFilepath);
  if (!exists) return undefined;
  const tsConfig = (await readJSON(configFilepath)) as { compilerOptions: ts.CompilerOptions };

  return { compilerOptions: tsConfig.compilerOptions };
}
