import { WarningDetails } from '../../../../../../common/warning/WarningDetails';
import { ComponentImplementationInfo } from '../../../../../discovery/component/ComponentInfo';
import { ComponentMetadata } from '../../../ComponentDefinition';
import { serializeJSComponent } from '../serializeJSComponent';
import { getImplementation } from './utils/getImplementation';

describe('serializeJSComponent', () => {
  describe('providing array of objects describing all properties of the JavaScript component', () => {
    it('serializes functional component with primitive property types', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionPrimitivesOnly');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'FunctionPrimitivesOnly',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: true,
            name: 'id',
            type: { name: 'string', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'action',
            type: { name: 'number', structure: {} },
          },
          {
            description: '',
            isRequired: false,
            name: 'hidden',
            type: { name: 'boolean', structure: {} },
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

    it('serializes class component with enum property types', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassEnumTypes');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassEnumTypes',
        properties: [
          {
            description: 'oneOfType property type',
            isRequired: false,
            name: 'children',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'string', structure: {} },
                  { name: 'number', structure: {} },
                  { name: 'typedArray', structure: { memberType: { name: 'node', structure: {} } } },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'appearance',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 'secondary' } },
                  { name: 'literal', structure: { value: 'primary' } },
                  { name: 'literal', structure: { value: 'link' } },
                ],
              },
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

    it('serializes class component with default property values', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassWithDefaults');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassWithDefaults',
        properties: [
          {
            defaultValue: { value: 'Submit' },
            description: '',
            isRequired: false,
            name: 'value',
            type: { name: 'string', structure: {} },
          },
          {
            defaultValue: { value: 'secondary' },
            description: '',
            isRequired: false,
            name: 'appearance',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 'secondary' } },
                  { name: 'literal', structure: { value: 'primary' } },
                  { name: 'literal', structure: { value: 'link' } },
                ],
              },
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

    it('serializes component with shape property type', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('ClassPropShapeType');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'ClassPropShapeType',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'item',
            type: {
              name: 'shape',
              structure: {
                param1: { name: 'string', structure: {} },
                param2: { name: 'string', structure: {} },
                param3: {
                  name: 'shape',
                  structure: {
                    name: { name: 'string', structure: {} },
                  },
                },
              },
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

    it('serializes component with shape property type and a default value for it', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('PropShapeTypeWithDefault');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'PropShapeTypeWithDefault',
        properties: [
          {
            defaultValue: {
              value: {
                param1: 'param1 default value',
                param3: { name: 'param3.name value' },
              },
            },
            description: '',
            isRequired: false,
            name: 'item',
            type: {
              name: 'shape',
              structure: {
                param1: { name: 'string', structure: {} },
                param2: { name: 'string', structure: {} },
                param3: {
                  name: 'shape',
                  structure: {
                    name: { name: 'string', structure: {} },
                  },
                },
              },
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

    it('serializes component with Flow property types', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('IntegrationComboFlow');
      console.log('FLOW', component);
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'IntegrationComboFlow',
        properties: [
          {
            description: 'Rendered content of the component',
            isRequired: true,
            name: 'children',
            type: {
              name: 'node',
              structure: {},
            },
          },
          {
            description: 'Disables the Button',
            isRequired: false,
            name: 'disabled',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
          {
            description: "Stretch button to it's parent",
            isRequired: false,
            name: 'fullWidth',
            type: {
              name: 'boolean',
              structure: {},
            },
          },
          {
            defaultValue: {
              value: 'button',
            },
            description:
              'Element to be used as the root node - e.g. `a` can be used to create a link that is styled ' +
              'like a Button',
            isRequired: false,
            name: 'element',
            type: {
              name: 'unsupported',
              structure: {
                raw: '$FlowFixMe',
              },
            },
          },
          {
            description: 'Icon that goes after the children',
            isRequired: false,
            name: 'iconEnd',
            type: {
              name: 'element',
              structure: {},
            },
          },
          {
            description: 'Icon that goes before the children',
            isRequired: false,
            name: 'iconStart',
            type: {
              name: 'element',
              structure: {},
            },
          },
          {
            description: 'Called with the click event',
            isRequired: false,
            name: 'onClick',
            type: {
              name: 'func',
              structure: {
                arguments: [
                  {
                    name: 'event',
                    type: {
                      name: 'unsupported',
                      structure: {
                        raw: 'SyntheticEvent',
                      },
                    },
                  },
                ],
                returnType: {
                  name: 'empty',
                  structure: {},
                },
              },
            },
          },
          {
            defaultValue: {
              value: 'large',
            },
            description: 'Available sizes',
            isRequired: false,
            name: 'size',
            type: {
              name: 'union',
              structure: {
                elements: [
                  {
                    name: 'literal',
                    structure: {
                      value: 'small',
                    },
                  },
                  {
                    name: 'literal',
                    structure: {
                      value: 'medium',
                    },
                  },
                  {
                    name: 'literal',
                    structure: {
                      value: 'large',
                    },
                  },
                  {
                    name: 'literal',
                    structure: {
                      value: 'jumbo',
                    },
                  },
                ],
              },
            },
          },
          {
            defaultValue: {
              value: 'button',
            },
            description: 'Available types',
            isRequired: false,
            name: 'type',
            type: {
              name: 'union',
              structure: {
                elements: [
                  {
                    name: 'string',
                    structure: {},
                  },
                  {
                    name: 'object',
                    structure: {},
                  },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'data',
            type: {
              name: 'shape',
              structure: {
                firstProp: {
                  name: 'func',
                  structure: {},
                },
                otherProp: {
                  name: 'shape',
                  structure: {
                    propOfNested: {
                      name: 'shape',
                      structure: {
                        prop: {
                          name: 'any',
                          structure: {},
                        },
                      },
                    },
                  },
                },
                secondProp: {
                  name: 'typedArray',
                  structure: {
                    memberType: {
                      name: 'number',
                      structure: {},
                    },
                  },
                },
              },
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

    it('serializes component with imported enum property types', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithImportedEnum');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'FunctionWithImportedEnum',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'children',
            type: {
              name: 'node',
              structure: {},
            },
          },
          {
            description: '',
            isRequired: true,
            name: 'appearance',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 'secondary' } },
                  { name: 'literal', structure: { value: 'primary' } },
                  { name: 'literal', structure: { value: 'link' } },
                ],
              },
            },
          },
          {
            description: '',
            isRequired: false,
            name: 'modifier',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 'neutral' } },
                  { name: 'literal', structure: { value: 'danger' } },
                  { name: 'literal', structure: { value: 'positive' } },
                ],
              },
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

    it('provides warning details for corrupted default property values', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('CorruptedDefaultPropertyValue');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'CorruptedDefaultPropertyValue',
        properties: [
          {
            description: '',
            isRequired: false,
            name: 'value',
            type: {
              name: 'string',
              structure: {},
            },
          },
        ],
        wrappers: [],
      };
      const expectedWarning: WarningDetails = {
        message: `Cannot compute default value for property \`value\`

ReferenceError: some is not defined

`,
        sourcePath: component.path,
      };

      // when
      return serializeJSComponent(component).then((serialized) => {
        // then
        expect(serialized.result).toEqual(expectedMetadata);
        expect(serialized.warnings[0].message).toEqual(expectedWarning.message);
        expect(serialized.warnings[0].sourcePath).toEqual(expectedWarning.sourcePath);
      });
    });

    it('rejects returned promise when there is no React component in the given file', (done) => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FileWithoutComponent');

      // when
      serializeJSComponent(component).catch((error) => {
        // then
        expect(error.message).toMatch(/No .*component .*found/i);
        done();
      });
    });

    it('rejects returned promise when there is no file at the given path', (done) => {
      // given
      const component: ComponentImplementationInfo = getImplementation('NonexistentFile');

      // when
      serializeJSComponent(component).catch((error) => {
        // then
        expect(error.message).toMatch(/No .*such .*file/i);
        done();
      });
    });

    it('serializes component with number as oneOf', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('PropTypesOneOfNumber');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        name: 'PropTypesOneOfNumber',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'typeIndex',
            type: {
              name: 'union',
              structure: {
                elements: [
                  { name: 'literal', structure: { value: 1 } },
                  { name: 'literal', structure: { value: 'test' } },
                  { name: 'literal', structure: { value: 3 } },
                ],
              },
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

    it('serializes component with `usePortal` attribute', () => {
      // given
      const component: ComponentImplementationInfo = getImplementation('FunctionWithUsePortalDeclaration');
      const expectedMetadata: ComponentMetadata = {
        defaultExported: true,
        usePortal: true,
        name: 'FunctionWithUsePortalDeclaration',
        properties: [
          {
            description: '',
            isRequired: true,
            name: 'name',
            type: { name: 'string', structure: {} },
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
  });
});
