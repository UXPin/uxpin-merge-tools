import { ImplSerializationResult } from '../../../serialization/component/implementation/ImplSerializationResult';
import { CliConfig, ComponentSerializer } from '../CliConfig';
import { getSerializationPlugin } from '../getSerializationPlugin';

function serializationPlugin():Promise<ImplSerializationResult> {
  return Promise.resolve({
    result: {
      name: 'Foo',
      properties: [],
    },
    warnings: [],
  });
}

describe('getSerializationPlugin', () => {
  it('should return undefined if plugin is not available in configuration', () => {
    // having
    const config:CliConfig = {
      components: {
        categories: [],
      },
    };

    // when
    const plugin:ComponentSerializer | undefined = getSerializationPlugin(config);

    // then
    expect(plugin).toBeUndefined();
  });

  it('should return serialization plugin', () => {
    // having
    const config:CliConfig = {
      components: {
        categories: [],
        plugins: {
          serialization: serializationPlugin,
        },
      },
    };

    // when
    const plugin:ComponentSerializer | undefined = getSerializationPlugin(config);

    // then
    expect(plugin).toBe(serializationPlugin);
  });
});
