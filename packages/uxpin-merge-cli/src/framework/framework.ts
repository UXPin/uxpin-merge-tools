import { FrameworkModule } from './FrameworkModule';
import { FrameworkNames } from './frameworkNames';
import { reactModule } from './reactjs';

type FrameworkNamesKeys = keyof typeof FrameworkNames;
type FrameworkModules = { [key in FrameworkNamesKeys]:FrameworkModule };
type ObjectName = keyof FrameworkModule;

const frameworkModules:FrameworkModules = {
  [FrameworkNames.reactjs]: reactModule,
};

export class Framework {
  public static currentFrameworkName:FrameworkNames;

  public static loadFrameworkModule<T extends ObjectName>(objectName:T):FrameworkModule[T] {
	  const module:FrameworkModule = frameworkModules[Framework.currentFrameworkName];

	  if (!module) {
		  throw new Error('Invalid framework name');
	  }

	  if (!module[objectName]) {
		  throw new Error(`${objectName} does not exist in ${Framework.currentFrameworkName} module`);
	  }

	  return module[objectName];
  }
}
