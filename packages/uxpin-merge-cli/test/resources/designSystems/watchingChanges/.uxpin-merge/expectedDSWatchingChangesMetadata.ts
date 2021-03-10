import { ComponentDefinition } from '../../../../../src/steps/serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../../src/steps/serialization/DesignSystemSnapshot';

export const expectedAvatarDefinition:ComponentDefinition = {
  defaultExported: true,
  documentation: {
    examples: [],
  },
  info: {
    dirPath: 'src/components/Avatar',
    implementation: {
      framework: 'reactjs',
      lang: 'javascript',
      path: 'src/components/Avatar/Avatar.jsx',
    },
    presets: [
      {
        path: 'src/components/Avatar/presets/0-default.jsx',
      },
    ],
  },
  name: 'Avatar',
  presets: [
    {
      elements: {
        1: {
          name: 'Avatar',
          props: {
            imageUrl: 'https://placekitten.com/200/300',
          },
        },
      },
      name: 'default',
      rootId: '1',
    },
  ],
  properties: [
    {
      defaultValue: {
        value: '',
      },
      description: '',
      isRequired: false,
      name: 'size',
      type: {
        name: 'union',
        structure: {
          elements: [
            {
              name: 'literal',
              structure: {
                value: 'xs',
              },
            },
            {
              name: 'literal',
              structure: {
                value: 's',
              },
            },
            {
              name: 'literal',
              structure: {
                value: 'l',
              },
            },
            {
              name: 'literal',
              structure: {
                value: 'xl',
              },
            },
          ],
        },
      },
    },
    {
      description: '',
      isRequired: true,
      name: 'imageUrl',
      type: {
        name: 'string',
        structure: {},
      },
    },
  ],
  wrappers: [],
};

export const expectedButtonDefinition:ComponentDefinition = {
  defaultExported: true,
  documentation: {
    examples: [],
  },
  info: {
    dirPath: 'src/components/Button',
    implementation: {
      framework: 'reactjs',
      lang: 'javascript',
      path: 'src/components/Button/Button.jsx',
    },
    presets: [
      {
        path: 'src/components/Button/presets/0-default.jsx',
      },
    ],
  },
  name: 'Button',
  presets: [
    {
      elements: {
        1: {
          name: 'Button',
          props: {
            children: 'Click me',
            primary: true,
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
      type: {
        name: 'node',
        structure: {},
      },
    },
    {
      description: '',
      isRequired: true,
      name: 'primary',
      type: {
        name: 'boolean',
        structure: {},
      },
    },
  ],
  wrappers: [],
};

export const expectedDSWatchingChangesMetadata:DesignSystemSnapshot = {
  categorizedComponents: [
    {
      components: [
        expectedAvatarDefinition,
      ],
      name: 'General',
    },
    {
      components: [
        expectedButtonDefinition,
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
