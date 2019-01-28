"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedAvatarDefinition = {
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
                path: 'src/components/Avatar/presets/0-default.json',
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
            isRequired: true,
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
};
exports.expectedButtonDefinition = {
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
                path: 'src/components/Button/presets/0-default.json',
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
};
exports.expectedDSWatchingChangesMetadata = {
    categorizedComponents: [
        {
            components: [
                exports.expectedAvatarDefinition,
            ],
            name: 'General',
        },
        {
            components: [
                exports.expectedButtonDefinition,
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
//# sourceMappingURL=expectedDSWatchingChangesMetadata.js.map