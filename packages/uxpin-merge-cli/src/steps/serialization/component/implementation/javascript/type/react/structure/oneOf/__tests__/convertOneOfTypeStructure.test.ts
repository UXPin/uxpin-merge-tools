import { UnionTypeStructure } from '../../../../../../ComponentPropertyDefinition';
import { convertOneOfTypeStructure } from '../convertOneOfTypeStructure';

describe('convertOneOfTypeStructure', () => {
  describe('converting react-docgen enum type structure to common format', () => {
    it('correctly converts literal enum type with single quotes', () => {
      // given
      const inputTypeStructure:any = [
        { computed:false, value: '\'secondary\'' },
        { computed:false, value: '\'primary\'' },
        { computed:false, value: '\'link\'' },
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
        { computed:false, value: '"secondary"' },
        { computed:false, value: '"primary"' },
        { computed:false, value: '"link"' },
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

    it('correctly converts complex enum type structures', () => {
      // given
      const inputTypeStructure:any = [
        {
          name: 'shape',
          value: {
            property1: {
              name: 'node',
            },
          },
        },
        {
          name: 'node',
        },
      ];
      const expectedOutputStructure:UnionTypeStructure = {
        elements: [
          { name: 'shape', structure: { property1: { name: 'node', structure: {} } } },
          { name: 'node', structure: {} },
        ],
      };

      // when
      const result:UnionTypeStructure = convertOneOfTypeStructure(inputTypeStructure);

      // then
      expect(result).toEqual(expectedOutputStructure);
    });

    it('ignores literal values which are not strings', () => {
      // given
      const inputTypeStructure:any = [
        { computed: false, value: '{"secondary": true}' },
        { computed: false, value: '"link"' },
      ];
      const expectedOutputStructure:UnionTypeStructure = {
        elements: [
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
