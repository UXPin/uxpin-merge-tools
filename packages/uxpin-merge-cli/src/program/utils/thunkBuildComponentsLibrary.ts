import { buildDesignSystem } from '../../steps/building/buildDesignSystem';
import { BuildOptions } from '../../steps/building/BuildOptions';
import { getAllComponentsFromCategories } from '../../steps/serialization/component/categories/getAllComponentsFromCategories';
import { ComponentDefinition } from '../../steps/serialization/component/ComponentDefinition';
import { DSMetadata } from '../DSMeta';

export function thunkBuildComponentsLibrary(buildOptions: BuildOptions): (ds: DSMetadata) => Promise<any> {
  return ({ result: { categorizedComponents } }) => {
    const components: ComponentDefinition[] = getAllComponentsFromCategories(categorizedComponents);
    return buildDesignSystem(components, buildOptions);
  };
}
