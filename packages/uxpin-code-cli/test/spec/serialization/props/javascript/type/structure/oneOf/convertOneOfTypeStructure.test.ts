import { UnionTypeStructure, } from '../../../../../../../../src/serialization/props/ComponentPropertyDefinition';
// tslint:disable-next-line:max-line-length
import { convertOneOfTypeStructure } from '../../../../../../../../src/serialization/props/javascript/type/structure/oneOf/convertOneOfTypeStructure';

describe('convertOneOfTypeStructure', () => {
  describe('converting react-docgen enum type structure to common format', () => {
    it('correctly converts literal enum type with single quotes', () => {
      // given
      const inputTypeStructure:any = [
        { value: '\'secondary\'' },
        { value: '\'primary\'' },
        { value: '\'link\'' },
      ];
      const expectedOutputStructure:UnionTypeStructure = {
        elements: [
          { name: 'literal', structure: { value: 'secondary' } },
          { name: 'literal', structure: { value: 'primary' } },
          { name: 'literal', structure: { value: 'link' } },
        ],
      };

      // when
      const result:UnionTypeStructure = convertOneOfTypeStructure(inputTypeStructure);

      // then
      expect(result).toEqual(expectedOutputStructure);
    });

    it('correctly converts literal enum type with double quotes', () => {
      // given
      const inputTypeStructure:any = [
        { value: '"secondary"' },
        { value: '"primary"' },
        { value: '"link"' },
      ];
      const expectedOutputStructure:UnionTypeStructure = {
        elements: [
          { name: 'literal', structure: { value: 'secondary' } },
          { name: 'literal', structure: { value: 'primary' } },
          { name: 'literal', structure: { value: 'link' } },
        ],
      };

      // when
      const result:UnionTypeStructure = convertOneOfTypeStructure(inputTypeStructure);

      // then
      expect(result).toEqual(expectedOutputStructure);
    });
  });
});
