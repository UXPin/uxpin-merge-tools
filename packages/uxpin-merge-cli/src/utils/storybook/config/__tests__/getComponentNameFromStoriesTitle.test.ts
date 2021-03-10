import { using } from '../../../../../test/utils/using';
import { getComponentNameFromStoriesTitle } from '../getComponentNameFromStoriesTitle';

describe('getComponentNameFromStoriesTitle', () => {
  const cases:any[] = [
    { title: 'Component', expected: 'Component' },
    { title: 'Cate1/Component', expected: 'Component' },
    { title: 'Cate1/Sub1/Component', expected: 'Component' },
  ];

  using(cases).describe(
    'checking if Component name is correctly picked', ({ title, expected }) => {
      it(`for given ${title}`, () => {
        const category:string = getComponentNameFromStoriesTitle(title);
        expect(category).toEqual(expected);
      });
    });
});
