import { ComponentPropsList } from '../../../../src/serialization/props/ComponentPropsList';
import { serializeComponentProps } from '../../../../src/serialization/props/serializeComponentProps';
import { testDirPath } from '../../../utils/env/testDirPath';
import { aComponentPropertyDefinition, ComponentPropertyDefinitionBuilder } from './ComponentPropertyDefinitionBuilder';
import { aDefaultValue } from './PropertyDefaultValueBuilder';
import { aPropertyType } from './PropertyTypeBuilder';

describe('serializeComponentProps – integration', () => {
  describe('providing array of objects describing all properties of the component', () => {
    describe('implemented in TypeScript', () => {
      it('serializes functional component with primitive property types', () => {
        // given
        const componentPath:string = getTypeScriptComponentPath('FunctionPrimitivesOnly');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('children')
            .withType(aPropertyType().withName('string')),
          aComponentPropertyDefinition()
            .withName('id')
            .withType(aPropertyType().withName('string'))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('action')
            .withType(aPropertyType().withName('number')),
          aComponentPropertyDefinition()
            .withName('hidden')
            .withType(aPropertyType().withName('boolean')),
        ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });

      it('serializes class component with enum property types', () => {
        // given
        const componentPath:string = getTypeScriptComponentPath('ClassEnumTypes');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('children')
            .withType(aPropertyType().withName('node')),
          aComponentPropertyDefinition()
            .withName('id')
            .withType(aPropertyType().withName('string'))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('appearance')
            .withType(aPropertyType()
              .withName('union')
              .withStructure({
                elements: [
                  aPropertyType().withName('literal').withStructure({ value: 'secondary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'primary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'link' }),
                ],
              }))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('modifier')
            .withType(aPropertyType()
              .withName('union')
              .withStructure({
                elements: [
                  aPropertyType().withName('literal').withStructure({ value: 'neutral' }),
                  aPropertyType().withName('literal').withStructure({ value: 'danger' }),
                  aPropertyType().withName('literal').withStructure({ value: 'positive' }),
                ],
              }))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('hidden')
            .withType(aPropertyType().withName('boolean'))
            .withIsRequired(true),
        ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });

      it('serializes class component with default property values', () => {
        // given
        const componentPath:string = getTypeScriptComponentPath('ClassWithDefaults');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('value')
            .withType(aPropertyType().withName('string'))
            .withDefaultValue(aDefaultValue().withValue('Submit')),
          aComponentPropertyDefinition()
            .withName('appearance')
            .withType(aPropertyType()
              .withName('union')
              .withStructure({
                elements: [
                  aPropertyType().withName('literal').withStructure({ value: 'secondary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'primary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'link' }),
                ],
              }))
            .withIsRequired(true)
            .withDefaultValue(aDefaultValue().withValue('secondary')),
        ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });

      it('component with interface property type', () => {
        // given
        const componentPath:string = getTypeScriptComponentPath('ClassInterfaceTypes');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('item')
            .withType(aPropertyType()
              .withName('shape')
              .withStructure({
                param1: aPropertyType().withName('string').build(),
                param2: aPropertyType().withName('string').build(),
                param3: aPropertyType()
                  .withName('shape')
                  .withStructure({
                    name: aPropertyType().withName('string').build(),
                  }),
              }))
            .withIsRequired(true).build(),
        ];

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });
    });

    describe('implemented in JavaScript', () => {
      it('serializes functional component with primitive property types', () => {
        // given
        const componentPath:string = getJavaScriptComponentPath('FunctionPrimitivesOnly');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('children')
            .withType(aPropertyType().withName('string')),
          aComponentPropertyDefinition()
            .withName('id')
            .withType(aPropertyType().withName('string'))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('action')
            .withType(aPropertyType().withName('number')),
          aComponentPropertyDefinition()
            .withName('hidden')
            .withType(aPropertyType().withName('boolean')),
        ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });

      it('serializes class component with enum property types', () => {
        // given
        const componentPath:string = getJavaScriptComponentPath('ClassEnumTypes');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('children')
            .withType(aPropertyType().withName('node')),
          aComponentPropertyDefinition()
            .withName('id')
            .withType(aPropertyType().withName('string'))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('appearance')
            .withType(aPropertyType()
              .withName('union')
              .withStructure({
                elements: [
                  aPropertyType().withName('literal').withStructure({ value: 'secondary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'primary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'link' }),
                ],
              }))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('modifier')
            .withType(aPropertyType()
              .withName('union')
              .withStructure({
                elements: [
                  aPropertyType().withName('literal').withStructure({ value: 'neutral' }),
                  aPropertyType().withName('literal').withStructure({ value: 'danger' }),
                  aPropertyType().withName('literal').withStructure({ value: 'positive' }),
                ],
              }))
            .withIsRequired(true),
          aComponentPropertyDefinition()
            .withName('hidden')
            .withType(aPropertyType().withName('boolean'))
            .withIsRequired(true),
        ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });

      it('serializes class component with default property values', () => {
        // given
        const componentPath:string = getJavaScriptComponentPath('ClassWithDefaults');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('value')
            .withType(aPropertyType().withName('string'))
            .withDefaultValue(aDefaultValue().withValue('Submit')),
          aComponentPropertyDefinition()
            .withName('appearance')
            .withType(aPropertyType()
              .withName('union')
              .withStructure({
                elements: [
                  aPropertyType().withName('literal').withStructure({ value: 'secondary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'primary' }),
                  aPropertyType().withName('literal').withStructure({ value: 'link' }),
                ],
              }))
            .withIsRequired(true)
            .withDefaultValue(aDefaultValue().withValue('secondary')),
        ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });

      it('component with shape property type', () => {
        // given
        const componentPath:string = getJavaScriptComponentPath('ClassPropShapeType');
        const expectedProps:ComponentPropsList = [
          aComponentPropertyDefinition()
            .withName('item')
            .withType(aPropertyType()
              .withName('shape')
              .withStructure({
                param1: aPropertyType().withName('string').build(),
                param2: aPropertyType().withName('string').build(),
                param3: aPropertyType()
                  .withName('shape')
                  .withStructure({
                    name: aPropertyType().withName('string').build(),
                  }),
              }))
            .withIsRequired(true).build(),
        ];

        // when
        return serializeComponentProps(componentPath).then((serializedProps) => {
          // then
          expect(serializedProps).toEqual(expectedProps);
        });
      });
    });
  });

  function getTypeScriptComponentPath(componentName:string):string {
    return `${testDirPath}resources/components/typescript/${componentName}.tsx`;
  }

  function getJavaScriptComponentPath(componentName:string):string {
    return `${testDirPath}resources/components/javascript/${componentName}.jsx`;
  }
});
