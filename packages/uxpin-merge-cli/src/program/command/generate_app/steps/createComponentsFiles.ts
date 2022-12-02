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
import { yesNo } from '../../../utils/yesNo';

export function createComponentsFiles(args: GenerateAppProgramArgs, appConfig: AppConfig): Step {
  return { exec: thunkCreateComponentsFiles(args, appConfig), shouldRun: true };
}

const SUFFIX = 'El';

export const components: Array<{ name: string; include: string[] }> = [];

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

function getPropType(property: SerializedProperty) {
  if (property.uxpinPropName || property.uxpinControlType || property.uxpinDescription) {
    return [
      `  /**`,
      `   ${property.uxpinPropName ? `* @uxpinpropname ${property.uxpinPropName}` : ''}`,
      `   ${property.uxpinControlType ? `* @uxpincontroltype ${property.uxpinControlType}` : ''}`,
      `   ${property.uxpinDescription ? `* @uxpindescription ${property.uxpinDescription}` : ''}`,
      `   */`,
      `  ${property.name}: ${property.type},`,
    ]
      .filter((value) => Boolean(value.trim()))
      .join('\n');
  }

  return `  ${property.name}: ${property.type},`;
}

function getPropTypes(name: string, properties: SerializedProperty[]): string {
  if (!properties || !properties.length) {
    return '';
  }

  return [`${name}.propTypes = {`, properties.map((property) => getPropType(property)).join('\n'), `};`].join('\n');
}

function getComponentContent(componentData: SerializedComponent): string {
  const { name, importStatement, properties } = componentData;
  const propTypes = getPropTypes(name, properties);
  const defaultProps = getDefaultProps(name, properties);
  return [
    `import React from 'react';`,
    `import PropTypes from 'prop-types';`,
    importStatement.trim(),
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
    const componentsPath = resolve(APP_DIRECTORY, 'components');
    if (!(await pathExists(componentsPath))) {
      mkdir(componentsPath);
    }

    await pMapSeries(appConfig.components, async (componentData) => {
      let category = components.find((data) => data.name === componentData.category);

      if (!category) {
        category = { name: componentData.category, include: [] };
        components.push(category);
      }

      const componentDir = `${componentsPath}/${componentData.name}`;
      const componentFile = `${componentDir}/${componentData.name}.jsx`;
      let shouldOverwriteFile = true;

      if (await pathExists(componentFile)) {
        shouldOverwriteFile = await yesNo(
          `The file ${componentDir}/${componentData.name}.jsx already exists. Do you want to overwrite it`
        );
      }

      if (shouldOverwriteFile) {
        await ensureDir(componentDir);
        await writeToFile(componentFile, getComponentContent(componentData));
        printLine(`✅ File ${componentFile} created`, { color: PrintColor.GREEN });
      }
      category.include.push(`components/${componentData.name}/${componentData.name}.jsx`);
      await generatePresetFile(componentFile);
    });
  };
}
