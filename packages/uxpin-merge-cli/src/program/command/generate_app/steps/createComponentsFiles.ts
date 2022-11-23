import { ensureDir, mkdir, pathExists } from 'fs-extra';
import pMapSeries = require('p-map-series');
import { resolve } from 'path';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { AppConfig, SerializedComponent, SerializedProperty } from '../types/appConfig';
import { generatePresetFile } from '../../generate_presets/getGeneratePresetsCommandSteps';

export function createComponentsFiles(args: GenerateAppProgramArgs, appConfig: AppConfig): Step {
  return { exec: thunkCreateComponentsFiles(args, appConfig), shouldRun: true };
}

const SUFFIX: string = 'El';

export let components: Array<{ name: string; include: string[] }> = [];

function getDefaultValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
}

function getDefaultProps(name: string, properties: SerializedProperty[]): string {
  if (!properties || !properties.length || !properties.some((property) => 'defaultValue' in property)) {
    return '';
  }

  return [
    `${name}.defaultProps = {`,
    properties
      .map((property) =>
        'defaultValue' in property ? `  ${property.name}: ${getDefaultValue(property.defaultValue)},` : false
      )
      .filter(Boolean)
      .join('\n'),
    `};`,
  ].join('\n');
}

function getPropTypes(name: string, properties: SerializedProperty[]): string {
  if (!properties || !properties.length) {
    return '';
  }

  return [
    `${name}.propTypes = {`,
    properties.map((property) => `  ${property.name}: ${property.type},`).join('\n'),
    `};`,
  ].join('\n');
}

function getComponentContent(componentData: SerializedComponent): string {
  const { name, packageName, properties, isExportDefault } = componentData;
  const propTypes = getPropTypes(name, properties);
  const defaultProps = getDefaultProps(name, properties);

  return [
    `import React from 'react';`,
    `import PropTypes from 'prop-types';`,
    isExportDefault
      ? `import ${name}${SUFFIX} from '${packageName}';`
      : `import { ${name} as ${name}${SUFFIX} } from '${packageName}';`,
    '',
    `const ${name} = (props) => {`,
    `  return <${name}${SUFFIX} {...props} />;`,
    `};`,
    propTypes ? `\n${propTypes}` : null,
    defaultProps ? `\n${defaultProps}` : null,
    '',
    `export default ${name};`,
  ]
    .filter((value) => value !== null)
    .join('\n');
}

export function thunkCreateComponentsFiles(args: GenerateAppProgramArgs, appConfig: AppConfig): () => Promise<void> {
  return async () => {
    const componentsPath: string = resolve(APP_DIRECTORY, 'components');
    if (!(await pathExists(componentsPath))) {
      mkdir(componentsPath);
    }

    await pMapSeries(appConfig.components, async (componentData) => {
      let category = components.find((data) => data.name === componentData.category);

      if (!category) {
        category = { name: componentData.category, include: [] };
        components.push(category);
      }

      const componentDir: string = `${componentsPath}/${componentData.name}`;
      const componentFile: string = `${componentDir}/${componentData.name}.jsx`;
      await ensureDir(componentDir);
      await writeToFile(componentFile, getComponentContent(componentData));
      category.include.push(`components/${componentData.name}/${componentData.name}.jsx`);
      printLine(`✅ File ${componentFile} created`, { color: PrintColor.GREEN });
      await generatePresetFile(componentFile);
    });
  };
}
