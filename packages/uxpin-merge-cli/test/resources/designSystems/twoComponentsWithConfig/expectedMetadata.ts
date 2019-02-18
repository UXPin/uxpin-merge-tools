import { ComponentDefinition } from '../../../../src/steps/serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../src/steps/serialization/DesignSystemSnapshot';

export const expectedAvatarMetadata:ComponentDefinition = {
  documentation: { examples: [] },
  info: {
    dirPath: 'src/components/Avatar',
    implementation: {
      framework: 'reactjs',
      lang: 'typescript',
      path: 'src/components/Avatar/Avatar.tsx',
    },
    presets: [
      { path: 'src/components/Avatar/presets/0-default.jsx' },
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
      name: 'children',
      type: { name: 'node', structure: {} },
    },
    {
      description: '',
      isRequired: true,
      name: 'size',
      type: { name: 'string', structure: {} },
    },
    {
      description: '',
      isRequired: true,
      name: 'imageUrl',
      type: { name: 'string', structure: {} },
    },
  ],
};

export const expectedButtonMetadata:ComponentDefinition = {
  documentation: { examples: [] },
  info: {
    dirPath: 'src/components/Button',
    implementation: {
      framework: 'reactjs',
      lang: 'typescript',
      path: 'src/components/Button/Button.tsx',
    },
    presets: [
      { path: 'src/components/Button/presets/0-default.jsx' },
    ],
  },
  name: 'Button',
  presets: [
    {
      elements: {
        ['1']: {
          name: 'Button',
          props: {
            children: 'Click me',
            isPrimary: true,
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
      isRequired: true,
      name: 'children',
      type: { name: 'node', structure: {} },
    },
    {
      description: '',
      isRequired: false,
      name: 'isPrimary',
      type: { name: 'boolean', structure: {} },
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
  name: 'Example Design System',
  vcs: expect.objectContaining({
    branchName: 'master',
    commitHash: expect.stringMatching(/[a-z0-9]+/),
  }),
};
