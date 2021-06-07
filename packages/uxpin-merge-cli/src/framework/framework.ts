import { commonModule } from './common';
import { FrameworkModule } from './FrameworkModule';
import { FrameworkNames } from './frameworkNames';
import { reactModule } from './reactjs';

type FrameworkNamesKeys = keyof typeof FrameworkNames;
type FrameworkNamesFields = { [key in FrameworkNamesKeys]:FrameworkModule };
type ObjectName = keyof FrameworkModule;

interface FrameworkModules extends FrameworkNamesFields {
  common:FrameworkModule;
}

const frameworkModules:FrameworkModules = {
  common: commonModule,
  [FrameworkNames.reactjs]: reactModule,
};

export class Framework {
  public static currentFrameworkName:FrameworkNames;

  public static loadFrameworkModule<T extends ObjectName>(objectName:T):FrameworkModule[T] {
	  const module:FrameworkModule = frameworkModules[Framework.currentFrameworkName];

	  if (!module) {
		  throw new Error('Invalid framework name');
	  }

	  if (!module[objectName] && !frameworkModules.common[objectName]) {
		  throw new Error(`${objectName} does not exist in ${Framework.currentFrameworkName} and common modules`);
	  }

	  return module[objectName] || frameworkModules.common[objectName];
  }
}
