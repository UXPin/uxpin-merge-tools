import { kebabCase } from 'lodash';
import * as React from 'react';
import { ComponentDefinition } from '../../../../steps/serialization/component/ComponentDefinition';
import { ExampleRenderer } from '../ExampleRenderer';
import { ComponentPreview } from './ComponentPreview';
import { ComponentProps } from './ComponentProps';

interface Props extends ComponentDefinition {
  renderExample: ExampleRenderer;
}

// tslint:disable:variable-name
export const ComponentContainer: React.SFC<Props> = ({
  documentation: { examples },
  name = '',
  properties,
  renderExample,
}: Props) => {
  const headerId = `header-${kebabCase(name)}`;

  return (
    <div>
      <h3 id={headerId}>{name}</h3>
      <ComponentPreview examples={examples} renderExample={renderExample} />
      <ComponentProps properties={properties} />
    </div>
  );
};
