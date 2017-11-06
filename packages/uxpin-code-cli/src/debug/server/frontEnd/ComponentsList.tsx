import * as React from 'react';
import { ComponentDefinition } from '../../../steps/serialization/component/ComponentDefinition';
import { ComponentContainer } from './component/ComponentContainer';
import { ExampleRenderer } from './ExampleRenderer';

interface Props {
  components:ComponentDefinition[];
  renderExample:ExampleRenderer;
}
// tslint:disable:variable-name
export const ComponentsList:React.SFC<Props> = ({ components, renderExample }:Props) => (
  <div>
    {components.map((component) => (
      <ComponentContainer renderExample={renderExample} {...component} />
    ))}
  </div>
);
