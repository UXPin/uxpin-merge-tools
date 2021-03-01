import { join, resolve } from 'path';
import { using } from '../../../../../test/utils/using';
import { getStoriesInfo, StoriesInfo } from '../getStoriesInfo';

const STORYBOOK_DS_PATH:string = resolve(__dirname, '../../../../../test/resources/repos/storybook-design-system');

describe('getStoriesInfo', () => {

  const cases:any[] = [
    {
      description: 'with title and componenent defined in export default',
      path: 'src/components/Button.stories.js',
    },
    {
      description: 'with title defined and title contains imported component name',
      path: 'src/components/ButtonToggle.stories.tsx',
    },
  ];

  using(cases).describe(
    'checking if StoriesInfo is correctly returned', ({ description, path }) => {
      describe(description, () => {
        it('should return StoriesInfo', async () => {
          const storiesInfo:StoriesInfo | null = await getStoriesInfo(join(STORYBOOK_DS_PATH, path));
          expect(storiesInfo);
        });
      });
    });

  describe('without actual component imported', () => {
    it('should return null', async () => {
      const path:string = join(STORYBOOK_DS_PATH, 'src/components/SharedStyles.stories.tsx');
      const storiesInfo:StoriesInfo | null = await getStoriesInfo(path);
      expect(storiesInfo).toBeNull();
    });
  });
});
