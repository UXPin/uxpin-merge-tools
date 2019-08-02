import { Command } from '../../../src';
import { DesignSystemSnapshot } from '../../../src/steps/serialization/DesignSystemSnapshot';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';

describe('JSX Stories Serialization', () => {
  describe('when declared in a component directory', () => {

    let metadata:DesignSystemSnapshot;

    beforeAll(async () => {
      const output:string = await runUXPinMergeCommand({
        cwd: 'resources/designSystems/withStoriesInComponentDir',
        params: [
          Command.DUMP,
          '--config "uxpin.config.js"',
          '--webpack-config "./webpack.config.js"',
        ],
      });

      metadata = JSON.parse(output);
    });

    it('correctly recognizes stories.js as preset files with a correct type', () => {
      expect(metadata.categorizedComponents[0].components[0].info.presets).toEqual([
        {
          path: 'src/components/Avatar/Avatar.stories.js',
          type: 'story',
        },
      ]);
    });

    it('correctly recognizes stories.jsx as preset file with correct type', () => {
      expect(metadata.categorizedComponents[0].components[1].info.presets).toEqual([
        {
          path: 'src/components/ButtonWithIconAsProp/ButtonWithIconAsProp.stories.jsx',
          type: 'story',
        },
      ]);
    });

    it('correctly recognizes stories.js put in `stories` dir as preset file with correct type', () => {
      expect(metadata.categorizedComponents[1].components[0].info.presets).toEqual([
        {
          path: 'src/icons/IconStar/IconStar.stories.jsx',
          type: 'story',
        },
      ]);
    });

    it('serializes simple stories in the order of declaration', () => {
      expect(metadata.categorizedComponents[0].components[0].presets).toEqual([
        {
          elements: {
            root: {
              name: 'Avatar',
              props: {
                imagUrl: 'https://picsum.photos/100/100?image=1027',
                size: 'small',
              },
            },
          },
          name: 'simple',
          rootId: 'root',
          type: 'story',
        },
        {
          elements: {
            root: {
              name: 'Avatar',
              props: {
                imagUrl: 'https://picsum.photos/100/100?image=1027',
                size: 'large',
              },
            },
          },
          name: 'large',
          rootId: 'root',
          type: 'story',
        },
        {
          elements: {
            root: {
              name: 'Avatar',
              props: {
                // ignored `size` as has value of a function
                imagUrl: 'https://picsum.photos/100/100?image=1027',
              },
            },
          },
          name: 'withFunctionAsProperty',
          rootId: 'root',
          type: 'story',
        },
      ]);
    });

  });
});
