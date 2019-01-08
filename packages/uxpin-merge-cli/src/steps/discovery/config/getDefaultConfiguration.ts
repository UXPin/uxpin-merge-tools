import { LIBRARY_DEFAULT_NAME } from '../../experimentation/server/handler/libraries/GetLibrariesHandler';
import { CliConfig } from './CliConfig';

export function getDefaultConfiguration():CliConfig {
  return {
    components: {
      categories: [
        {
          include: [
            'src/components/*/*.{js,jsx,ts,tsx}',
            'src/*/*.{js,jsx,ts,tsx}',
          ],
          name: 'Uncategorized',
        },
      ],
    },
    name: LIBRARY_DEFAULT_NAME,
  };
}
