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
  };
}
