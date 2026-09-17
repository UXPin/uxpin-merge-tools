import * as vm from 'vm';
import { getProjectVolume } from '../../../common/fs/projectFs';
import { CliConfig } from './CliConfig';

export function readConfigurationFrom(configPath: string): CliConfig | undefined {
  try {
    const virtual: string | undefined = readVirtualConfig(configPath);
    return virtual === undefined ? require(configPath) : evaluateConfig(virtual, configPath);
  } catch (e) {
    if ((e as any).code === 'MODULE_NOT_FOUND') {
      console.log(`'${configPath}' not found. Using default configuration.`);
      return;
    }
    console.log('Error while reading configuration file. Using default configuration');
    console.log(e);
  }
}

function readVirtualConfig(configPath: string): string | undefined {
  const volume = getProjectVolume();
  if (!volume) {
    return undefined;
  }
  if (!volume.existsSync(configPath)) {
    const notFound: any = new Error(`Cannot find module '${configPath}'`);
    notFound.code = 'MODULE_NOT_FOUND';
    throw notFound;
  }
  return volume.readFileSync(configPath, 'utf8') as string;
}

/**
 * The configuration of a project that is not on disk. It is a CommonJS module
 * like any other, so it is run as one; `require` is not handed over, because a
 * virtual project has no module tree to resolve against, and a config that
 * reaches for one belongs on disk.
 */
function evaluateConfig(source: string, configPath: string): CliConfig {
  const module = { exports: {} as any };
  const evaluate = vm.runInNewContext(
    `(function (exports, module) {${source}\n})`,
    { console },
    { filename: configPath }
  );
  evaluate(module.exports, module);
  return module.exports;
}
