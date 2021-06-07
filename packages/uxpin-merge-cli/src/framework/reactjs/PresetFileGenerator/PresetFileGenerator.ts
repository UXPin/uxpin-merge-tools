import { mkdir, pathExists, readFile } from 'fs-extra';
import { kebabCase } from 'lodash';
import { dirname, relative, resolve } from 'path';
import { ComponentImplementationInfo } from '../../../steps/discovery/component/ComponentInfo';
import { getImplementationInfo } from '../../../steps/discovery/component/implementation/getImplementationInfo';
import { ComponentMetadata } from '../../../steps/serialization/component/ComponentDefinition';
import { getComponentMetadata } from '../../../steps/serialization/component/implementation/getComponentMetadata';
import { printLine, printWarning } from '../../../utils/console/printLine';
import { PrintColor } from '../../../utils/console/PrintOptions';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { generatePropertyValuePair, INDENTATION_CHAR } from './helpers/generatePropertyValuePair';
import { getPropTypeValue } from './helpers/getPropTypeValue';

const PRESET_FILE_NAME:string = '0-default.jsx';

interface Property {
  name:string;
  value:any;
}

function isChildrenProp(property:Property):boolean {
  return property.name === 'children';
}

export class PresetFileGenerator {

  private componentDirectory:string;
  private componentPath:string;
  private componentName!:string;
  private componentMetadata!:ComponentMetadata;
  private componentProperties!:Property[];
  private presetDirectory:string;
  private presetFilePath:string;

  constructor(componentPath:string) {
    this.componentPath = componentPath;
    this.componentDirectory = dirname(componentPath);
    this.presetDirectory = `${this.componentDirectory}/presets`;
    this.presetFilePath = `${this.presetDirectory}/${PRESET_FILE_NAME}`;
  }

  public async init():Promise<void> {
    if (await pathExists(resolve(__dirname, this.componentPath))) {
      throw new Error(`🛑 Component ${this.componentPath} does not exists`);
    }

    const implementationInfo:ComponentImplementationInfo | null = getImplementationInfo(this.componentPath);

    if (!implementationInfo) {
      throw Error(`🛑 Invalid component path - ${this.componentPath}`);
    }

    const { result: metadata, warnings: metadataWarnings } = await getComponentMetadata(implementationInfo);

    if (metadataWarnings.length && !metadata.properties.length) {
      throw new Error(metadataWarnings[0].message);
    }

    this.componentMetadata = metadata;
    this.componentName = this.componentMetadata.name;
    this.setPropertiesValues();
  }

  public async createPresetFile():Promise<void> {
    if (!await pathExists(this.presetDirectory)) {
      await mkdir(this.presetDirectory);
    }

    if (await pathExists(this.presetFilePath)) {
      printWarning(`👉 File ${this.presetFilePath} exists`);
      return;
    }

    const componentFileContent:string = await this.generateComponentFile();
    await writeToFile(this.presetFilePath, componentFileContent);
    printLine(`✅ File ${this.presetFilePath} created successfully`, { color: PrintColor.GREEN });
  }

  public async generateComponentFile():Promise<string> {
    return [
      await this.generateImports(),
      '',
      'export default (',
      `${INDENTATION_CHAR}<${this.componentName}`,
      `${this.generatePropertiesList()}`,
      `${this.generateComponentEnd()}`,
      ');',
    ].join('\n');
  }

  private setPropertiesValues():void {
    this.componentProperties = this.componentMetadata.properties.reduce((result:Property[], prop) => {
      result.push({
        name: prop.name,
        value: (prop.defaultValue && prop.defaultValue.value) || getPropTypeValue(prop.type),
      });
      return result;
    }, [{
      name: 'uxpId',
      value: `${kebabCase(this.componentName)}-1`,
    }]);
  }

  private generateComponentEnd():string {
    if (this.hasChildren()) {
      return `${INDENTATION_CHAR}>Put ${this.componentName} contents here</${this.componentName}>`;
    }

    return `${INDENTATION_CHAR}/>`;
  }

  private hasChildren():boolean {
    return !!this.componentProperties.find(isChildrenProp);
  }

  private async hasDefaultExport():Promise<boolean> {
    try {
      const file:string = await readFile(this.componentPath, 'utf8');
      return file.indexOf('export default') !== -1 || /export (.*) as default/.test(file);
    } catch (e) {
      return false;
    }
  }

  private async generateImports():Promise<string> {
    const relativeComponentPath:string = relative(this.presetDirectory, this.componentPath)
      .split('.')
      .slice(0, -1)
      .join('.');
    const importName:string = (await this.hasDefaultExport()) ? this.componentName : `{ ${this.componentName} }`;
    const imports:string[] = [
      `import React from 'react';`,
      `import ${importName} from '${relativeComponentPath}';`,
    ];

    return imports.join('\n');
  }

  private generatePropertiesList():string {
    return this.componentProperties.reduce((result:string[], property:Property) => {
      if (!isChildrenProp(property)) {
        result.push(generatePropertyValuePair(property.name, property.value));
      }

      return result;
    }, []).join('\n');
  }
}
