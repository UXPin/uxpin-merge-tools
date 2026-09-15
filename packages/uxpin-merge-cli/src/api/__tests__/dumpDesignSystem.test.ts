import { resolve } from 'path';
import { dumpDesignSystem, VirtualFile } from '../dumpDesignSystem';

/** Where React and its types are installed for the project under test. */
const PACKAGES_ROOT = resolve(__dirname, '../../..');

const CONFIG = `module.exports = {
  components: {
    categories: [{ name: 'Forms', include: ['src/Button/Button.tsx'] }],
  },
  name: 'A Virtual Library',
};`;

const BUTTON = `import * as React from 'react';

export interface ButtonProps {
  /** What the button says. */
  label?: string;
  /** How loud it is. */
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

/**
 * @uxpindescription A button, serialized from memory.
 */
export default function Button(props: ButtonProps) {
  return <button>{props.label}</button>;
}`;

const PRESET = `import * as React from 'react';
import Button from '../Button';

export default (
  <Button uxpId="button-1" label="Save" variant="primary" />
);`;

const FILES: VirtualFile[] = [
  { content: CONFIG, path: 'uxpin.config.js' },
  { content: BUTTON, path: 'src/Button/Button.tsx' },
  { content: PRESET, path: 'src/Button/presets/0-default.jsx' },
];

describe('dumpDesignSystem on a project held in memory', () => {
  jest.setTimeout(120000);

  it('serializes a library that was never written to disk', async () => {
    const { result, warnings } = await dumpDesignSystem({
      files: FILES,
      packagesRoot: PACKAGES_ROOT,
      revision: { branchName: 'master', commitHash: 'e1e1e1e1' },
    });

    expect(warnings).toEqual([]);
    expect(result.name).toEqual('A Virtual Library');
    expect(result.categorizedComponents).toHaveLength(1);
    expect(result.categorizedComponents[0].name).toEqual('Forms');

    const [component] = result.categorizedComponents[0].components;
    expect(component.name).toEqual('Button');
    expect(component.info.implementation.lang).toEqual('typescript');
  });

  it('reads the props and the documentation off the component', async () => {
    const { result } = await dumpDesignSystem({
      files: FILES,
      packagesRoot: PACKAGES_ROOT,
      revision: { branchName: 'master', commitHash: 'e1e1e1e1' },
    });

    const [component] = result.categorizedComponents[0].components;
    const label = component.properties.find((property) => property.name === 'label');
    const variant = component.properties.find((property) => property.name === 'variant');

    expect(label).toMatchObject({ description: 'What the button says.', type: { name: 'string' } });
    // The union has to survive: it is what the editor turns into a dropdown.
    expect(variant).toMatchObject({
      type: {
        name: 'union',
        structure: {
          elements: [
            { name: 'literal', structure: { value: 'primary' } },
            { name: 'literal', structure: { value: 'secondary' } },
          ],
        },
      },
    });
    expect(component.componentDescription).toEqual('A button, serialized from memory.');
  });

  it('compiles the preset into the element tree the editor renders', async () => {
    const { result } = await dumpDesignSystem({
      files: FILES,
      packagesRoot: PACKAGES_ROOT,
      revision: { branchName: 'master', commitHash: 'e1e1e1e1' },
    });

    const [component] = result.categorizedComponents[0].components;
    expect(component.presets).toHaveLength(1);

    const [preset] = component.presets;
    // The preset is compiled and run against placeholder components, so what
    // comes back is the element tree with the props as written.
    expect(preset.elements[preset.rootId]).toMatchObject({
      name: 'Button',
      props: { label: 'Save', variant: 'primary' },
    });
  });

  it('files the snapshot under the revision it was given, with no repository to read', async () => {
    const { result } = await dumpDesignSystem({
      files: FILES,
      packagesRoot: PACKAGES_ROOT,
      revision: { branchName: 'feat/wire', commitHash: 'deadbeef' },
    });

    expect(result.vcs.branchName).toEqual('feat/wire');
    expect(result.vcs.commitHash).toEqual('deadbeef');
  });
});
