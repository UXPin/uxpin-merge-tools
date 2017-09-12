import { ComponentPropsList } from '../../../../src/serialization/props/ComponentPropsList';
import { serializeComponentProps } from '../../../../src/serialization/props/serializeComponentProps';
import { testDirPath } from '../../../utils/env/testDirPath';
import { aComponentPropertyDefinition, ComponentPropertyDefinitionBuilder } from './ComponentPropertyDefinitionBuilder';
import { aDefaultValue } from './PropertyDefaultValueBuilder';
import { aPropertyType } from './PropertyTypeBuilder';

describe('serializeComponentProps – integration', () => {
  describe('providing array of objects describing all properties of the component', () => {
    it('serializes functional component with primitive property types', () => {
      // given
      const componentPath:string = testDirPath + 'resources/components/typescript/FunctionPrimitivesOnly.tsx';
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
      const componentPath:string = testDirPath + 'resources/components/typescript/ClassEnumTypes.tsx';
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
      const componentPath:string = testDirPath + 'resources/components/typescript/ClassWithDefaults.tsx';
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

    it('returns correct data structure for a component with properties defined as TypeScript interface', () => {
      // given
      const componentPath:string = testDirPath + 'resources/components/typescript/FunctionPrimitivesOnly.tsx';
      const expectedProps:ComponentPropsList = [
        aComponentPropertyDefinition()
          .withName('selected')
          .withType(aPropertyType().withName('number'))
          .withIsRequired(true),
        aComponentPropertyDefinition()
          .withName('tabs')
          .withType(aPropertyType()
            .withName('shape')
            .withStructure({
              accessibilityLabel: aPropertyType().withName('string').build(),
              id: aPropertyType().withName('string').build(),
              panelID: aPropertyType().withName('string').build(),
              title: aPropertyType().withName('string').build(),
              url: aPropertyType().withName('string').build(),
            }))
          .withIsRequired(true),
        aComponentPropertyDefinition()
          .withName('fitted')
          .withType(aPropertyType().withName('boolean')),
        aComponentPropertyDefinition()
          .withName('children')
          .withType(aPropertyType().withName('node')),
        aComponentPropertyDefinition()
          .withName('onSelect')
          .withType(aPropertyType().withName('func')),
      ].map((d:ComponentPropertyDefinitionBuilder) => d.build());

      // when
      return serializeComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });
  });
});
