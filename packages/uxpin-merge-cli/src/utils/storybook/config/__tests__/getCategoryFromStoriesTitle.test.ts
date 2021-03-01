import { using } from '../../../../../test/utils/using';
import { getCategoryFromStoriesTitle } from '../getCategoryFromStoriesTitle';

describe('getComponentNameFromStoriesTitle', () => {
  const cases:any[] = [
    { title: 'Component', expected: 'Uncategorized' },
    { title: 'Cate1/Component', expected: 'Cate1' },
    { title: 'Cate1/Sub1/Component', expected: 'Cate1' },
  ];

  using(cases).describe(
    'checking if category is correctly picked', ({ title, expected }) => {
      it(`for given ${title}`, () => {
        const category:string = getCategoryFromStoriesTitle(title);
        expect(category).toEqual(expected);
      });
    });
});
