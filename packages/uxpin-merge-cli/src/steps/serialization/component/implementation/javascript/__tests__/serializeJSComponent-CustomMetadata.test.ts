import { WarningDetails } from '../../../../../../common/warning/WarningDetails';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { CustomControlTypeName } from '../../ComponentPropertyDefinition';
import { serializeJSComponent } from '../serializeJSComponent';
import { getImplementation } from './utils/getImplementation';

describe('serializeJSComponent-CustomMetadata', () => {
  describe('providing array of objects describing all properties of the JavaScript component', () => {
    it('serializes component with custom description, name and ignore', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('PropTypesWithComments');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'PropTypesWithComments',
        properties: [
          {
            customDescription: `Multiline
description
of
the
component.`,
            customName: 'type',
            description: '',
            isRequired: true,
            name: 'buttonType',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customDescription: 'Custom description',
            customName: 'disabled',
            description: 'This is description of isDisabled property',
            hidden: true,
            isRequired: true,
            name: 'isDisabled',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };

      // when
      return serializeJSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual([]);
      });
    });

    it('serializes component with invalid custom names and gives proper warnings', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('PropTypesWithCorruptedComments');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'PropTypesWithCorruptedComments',
        properties: [
          {
            customName: 'duplicatedCustomName',
            description: '',
            isRequired: true,
            name: 'buttonType',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customName: 'duplicatedCustomName',
            description: '',
            isRequired: true,
            name: 'isDisabled',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
          {
            customName: 'isDisabled',
            description: '',
            isRequired: true,
            name: 'isDisabledDuplicate',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };

      // when
      return serializeJSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual([
          {
            message: 'Duplicated custom property name ("duplicatedCustomName") for "isDisabled"',
            sourcePath: component.path,
          },
          {
            message: 'Custom property name ("isDisabled") for "isDisabledDuplicate" matches existing property name',
            sourcePath: component.path,
          },
        ]);
      });
    });

    it('serializes component with textfield custom type', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('PropTypesWithTextfieldCustomType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'PropTypesWithTextfieldCustomType',
        properties: [
          {
            customType: {
              name: CustomControlTypeName.Textfield,
              structure: {
                rows: 1,
              },
            },
            description: '',
            isRequired: true,
            name: 'textfield0',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customType: {
              name: CustomControlTypeName.Textfield,
              structure: {
                rows: 5,
              },
            },
            description: '',
            isRequired: true,
            name: 'textfield5',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'textfieldCorrupted',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customType: {
              name: CustomControlTypeName.Textfield,
              structure: {
                rows: 3,
              },
            },
            description: '',
            isRequired: true,
            name: 'textfieldDefault',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            customType: {
              name: CustomControlTypeName.Textfield,
              structure: {
                rows: 3,
              },
            },
            description: '',
            isRequired: true,
            name: 'textfieldDefault2',
            type: {
              name: 'string',
              structure: {},
            },
          },
          {
            description: 'textfield control type should be ignored for a number',
            isRequired: true,
            name: 'numberProp',
            type: {
              name: 'number',
              structure: {},
            },
          },
          {
            description: 'textfield control type should be ignored for a boolean',
            isRequired: true,
            name: 'boolProp',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
          {
            customType: {
              name: CustomControlTypeName.Input,
              structure: {},
            },
            description: '',
            isRequired: false,
            name: 'childrenProp',
            type: {
              name: 'node',
              structure: {},
            },
          },
          {
            customType: {
              name: CustomControlTypeName.Textfield,
              structure: {
                rows: 10,
              },
            },
            description: '',
            isRequired: false,
            name: 'childrenProp2',
            type: {
              name: 'node',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };
      const expectedWarnings: WarningDetails[] = [
        {
          message: 'Custom type "textfield" can not be applied to "number" ("numberProp").',
          sourcePath: component.path,
        },
        {
          message: 'Custom type "textfield" can not be applied to "boolean" ("boolProp").',
          sourcePath: component.path,
        },
      ];

      // when
      return serializeJSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual(expectedWarnings);
      });
    });

    it('serializes component with unions', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('PropTypesWithSelectCustomType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'PropTypesWithSelectCustomType',
        properties: [
          {
            customType: {
              name: CustomControlTypeName.Select,
              structure: {},
            },
            description: '',
            isRequired: false,
            name: 'unionLiteral',
            type: {
              name: 'union',
              structure: {
                elements: [
                  {
                    name: 'literal',
                    structure: {
                      value: 'yes',
                    },
                  },
                  {
                    name: 'literal',
                    structure: {
                      value: 'no',
                    },
                  },
                ],
              },
            },
          },
          {
            customType: {
              name: CustomControlTypeName.Number,
              structure: {},
            },
            description: '',
            isRequired: false,
            name: 'unionTypes',
            type: {
              name: 'union',
              structure: {
                elements: [
                  {
                    name: 'string',
                    structure: {},
                  },
                  {
                    name: 'number',
                    structure: {},
                  },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: false,
            name: 'unionTypesWrongCustom',
            type: {
              name: 'union',
              structure: {
                elements: [
                  {
                    name: 'string',
                    structure: {},
                  },
                  {
                    name: 'number',
                    structure: {},
                  },
                ],
              },
            },
          },
        ],
        wrappers: [],
      };
      const expectedWarnings: WarningDetails[] = [
        {
          message: 'Custom type "switcher" can not be applied to "union" ("unionTypesWrongCustom").',
          sourcePath: component.path,
        },
      ];

      // when
      return serializeJSComponent(component).then((serializedProps) => {
        // then
        expect(serializedProps.result).toEqual(expectedMetadata);
        expect(serializedProps.warnings).toEqual(expectedWarnings);
      });
    });
  });
});
