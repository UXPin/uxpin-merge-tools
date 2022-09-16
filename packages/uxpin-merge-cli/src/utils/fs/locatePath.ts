// tslint:disable-next-line:import-name
import locatePathBis = require('locate-path');

export const locatePath: (input: Iterable<string>, options?: locatePathBis.Options) => Promise<string | undefined> =
  locatePathBis;
