import { ComponentDefinition } from '../../../../src/steps/serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../src/steps/serialization/DesignSystemSnapshot';

const expectedAvatarMetadata:ComponentDefinition = {
  documentation: { examples: [] },
  info: {
    dirPath: 'src/components/Avatar/',
    implementation: {
      framework: 'reactjs',
      lang: 'typescript',
      path: 'src/components/Avatar/Avatar.tsx',
    },
    presets: [
      { path: 'src/components/Avatar/presets/0-default.json' },
    ],
  },
  name: 'Avatar',
  presets: [
    {
      elements: {
        ['1']: {
          name: 'Avatar',
          props: {
            imageUrl: 'https://picsum.photos/100/100?image=1027',
            size: 'small',
          },
        },
      },
      name: 'default',
      rootId: '1',
    },
  ],
  properties: [
    {
      description: '',
      isRequired: false,
      name: 'size',
      type: {
        name: 'union',
        structure: {
          elements: [
            { name: 'literal', structure: { value: 'small' } },
            { name: 'literal', structure: { value: 'normal' } },
            { name: 'literal', structure: { value: 'large' } },
          ],
        },
      },
    },
    {
      description: '',
      isRequired: false,
      name: 'imageUrl',
      type: { name: 'string', structure: {} },
    },
  ],
};

const expectedButtonMetadata:ComponentDefinition = {
  documentation: { examples: [] },
  info: {
    dirPath: 'src/components/Button/',
    implementation: {
      framework: 'reactjs',
      lang: 'typescript',
      path: 'src/components/Button/Button.tsx',
    },
    presets: [
      { path: 'src/components/Button/presets/0-default.json' },
    ],
  },
  name: 'Button',
  presets: [
    {
      elements: {
        ['1']: {
          name: 'Button',
          props: {
            appearance: 'primary',
            children: 'Click me',
          },
        },
      },
      name: 'default',
      rootId: '1',
    },
  ],
  properties: [
    {
      description: '',
      isRequired: false,
      name: 'children',
      type: { name: 'node', structure: {} },
    },
    {
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
};

export const expectedMetadata:DesignSystemSnapshot = {
  categorizedComponents: [
    {
      components: [
        expectedAvatarMetadata,
      ],
      name: 'General',
    },
    {
      components: [
        expectedButtonMetadata,
      ],
      name: 'Forms',
    },
  ],
  name: '',
};
