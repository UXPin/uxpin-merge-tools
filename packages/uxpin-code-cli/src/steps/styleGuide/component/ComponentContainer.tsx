import * as React from 'react';
import { ComponentExample } from '../../serialization/component/examples/ComponentExample';
import { ComponentPropertyDefinition } from '../../serialization/component/implementation/ComponentPropertyDefinition';
import { ComponentPreview } from './ComponentPreview';
import { ComponentProps } from './ComponentProps';

interface Props {
  componentNames:string[];
  examples:ComponentExample[];
  library:{string:() => any};
  name:string;
  properties:ComponentPropertyDefinition[];
}

// tslint:disable:variable-name
export const ComponentContainer:React.SFC<Props> = ({
  componentNames,
  examples,
  library,
  name = '',
  properties,
}:Props) => {

  return (
    <div>
      <h3>{name}</h3>
      <ComponentPreview componentNames={componentNames} examples={examples} library={library} />
      <ComponentProps properties={properties}/>
    </div>
  );
};
