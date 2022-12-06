import { basename, resolve, relative } from 'path';
import { printLine } from '../../../../utils/console/printLine';
import { PrintColor } from '../../../../utils/console/PrintOptions';
import { writeToFile } from '../../../../utils/fs/writeToFile';
import { GenerateAppProgramArgs } from '../../../args/ProgramArgs';
import { Step } from '../../Step';
import { APP_DIRECTORY } from './createAppDirectory';
import { components } from './createComponentsFiles';
import { AppConfig, SerializedComponent } from '../types/appConfig';
import { pathExists } from 'fs-extra';
import { yesNo } from '../../../utils/yesNo';
import { webpackConfigPath } from './createWebpackConfigFile';
import { wrapperPath } from './createWrapperFile';

export function createUXPinConfigFile(
  args: GenerateAppProgramArgs,
  appConfig?: AppConfig,
  componentConfig?: SerializedComponent
): Step {
  return { exec: thunkCreateUXPinConfigFile(args, appConfig, componentConfig), shouldRun: true };
}

export function thunkCreateUXPinConfigFile(
  args: GenerateAppProgramArgs,
  appConfig?: AppConfig,
  componentConfig?: SerializedComponent
): () => Promise<void> {
  return async () => {
    let shouldOverwriteFile = true;
    const uxpinConfigFilePath: string = resolve(APP_DIRECTORY, 'uxpin.config.js');

    if (await pathExists(uxpinConfigFilePath)) {
      if (componentConfig) {
        const config = require(uxpinConfigFilePath);

        await writeToFile(
          uxpinConfigFilePath,
          getUXPinConfigFile(
            args,
            {
              wrapper: config.wrapper,
              webpack: config.webpack,
            },
            mergeComponents(config.components.categories, components)
          )
        );
        printLine(`✅ The file uxpin.config.js updated`, { color: PrintColor.GREEN });
        process.exit(0);
      }

      shouldOverwriteFile = await yesNo(`The file uxpin.config.js already exists. Do you want to overwrite it`);
    }

    if (shouldOverwriteFile) {
      await writeToFile(
        uxpinConfigFilePath,
        getUXPinConfigFile(
          args,
          {
            wrapper: appConfig && appConfig.wrapper ? relative(APP_DIRECTORY, wrapperPath) : '',
            webpack: appConfig && appConfig.webpack ? relative(APP_DIRECTORY, webpackConfigPath) : '',
          },
          components
        )
      );
      printLine(`✅ uxpin.config.js created`, { color: PrintColor.GREEN });
    }

    process.exit(0);
  };
}

// HELPERS

function mergeComponent(result: { [key: string]: string[] }, component: { name: string; include: string[] }) {
  result[component.name] = result[component.name] || [];
  result[component.name] = [...new Set([...result[component.name], ...component.include])];
  return result;
}

function mergeComponents(
  oldComponents: Array<{ name: string; include: string[] }>,
  newComponents: Array<{ name: string; include: string[] }>
) {
  const uniqueComponents = newComponents.reduce<{ [key: string]: string[] }>(
    mergeComponent,
    oldComponents.reduce(mergeComponent, {})
  );

  return Object.keys(uniqueComponents).map((categoryName) => ({
    name: categoryName,
    include: uniqueComponents[categoryName],
  }));
}

function getComponents(includes: string[]) {
  return includes.map((include) => `          '${include}',`).join('\n');
}

function getCategories(components: Array<{ name: string; include: string[] }>) {
  return components
    .map(({ name, include }) =>
      [
        '      {',
        `        name: '${name}',`,
        `        include: [`,
        `${getComponents(include)}`,
        `        ]`,
        '      },',
      ].join('\n')
    )
    .join('\n');
}

function getUXPinConfigFile(
  args: GenerateAppProgramArgs,
  appConfig?: { wrapper?: string; webpack?: string | boolean },
  components: Array<{ name: string; include: string[] }> = []
) {
  return [
    `module.exports = {`,
    `  name: '${basename(resolve(process.cwd(), args.directory))}',`,
    `  components: {`,
    `    categories: [`,
    `${getCategories(components)}`,
    `    ]`,
    appConfig && appConfig.wrapper ? `    wrapper: '${appConfig.wrapper}',` : '',
    appConfig && appConfig.webpack ? `    webpackConfig: '${appConfig.webpack}',` : '',
    `  }`,
    `};`,
  ]
    .filter(Boolean)
    .join('\n');
}
