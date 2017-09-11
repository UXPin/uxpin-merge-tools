import { ComponentPropsList } from '../../../../src/serialization/props/ComponentPropsList';
import { serializeComponentProps } from '../../../../src/serialization/props/serializeComponentProps';
import { testDirPath } from '../../../utils/env/testDirPath';
import { aComponentPropertyDefinition, ComponentPropertyDefinitionBuilder } from './ComponentPropertyDefinitionBuilder';
import { aPropertyType } from './PropertyTypeBuilder';

describe('serializeComponentProps – integration', () => {
  describe('providing array of objects describing all properties of the component', () => {
    it('returns correct data structure for a component with properties defined as TypeScript interface', () => {
      // given
      const componentPath:string = testDirPath + 'resources/repos/polaris/src/components/Tabs/Tabs.tsx';
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
          .withType(aPropertyType().withName('bool')),
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
