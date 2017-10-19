import * as React from 'react';
import { ComponentExample } from '../../serialization/component/examples/ComponentExample';
import { ComponentPropertyDefinition } from '../../serialization/component/implementation/ComponentPropertyDefinition';
import { ComponentPreview } from './ComponentPreview';
import { ComponentProps } from './ComponentProps';

interface Props {
  examples:ComponentExample[];
  imports:string[];
  name:string;
  properties:ComponentPropertyDefinition[];
}

// tslint:disable:variable-name
export const ComponentContainer:React.SFC<Props> = ({
  examples,
  imports,
  name = '',
  properties,
}:Props) => {

  return (
    <div>
      <h3>{name}</h3>
      <ComponentPreview examples={examples} imports={imports} />
      <ComponentProps properties={properties}/>
    </div>
  );
};
