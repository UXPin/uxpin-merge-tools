import * as React from 'react';
import {
  ComponentPropertyDefinition,
} from '../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';

interface Props {
  properties:ComponentPropertyDefinition[];
}

// tslint:disable:variable-name
export const ComponentProps:React.SFC<Props> = ({
  properties = [],
}:Props) => {

  return (
    <div style={{ fontSize: 'x-small' }}>
      <h4>Component properties</h4>
      <ul>
        {
          // tslint:disable-next-line
          properties.map((prop) => (<li>{`${prop.name}${prop.type ? ': ' + prop.type.name : ''}`}</li>))
        }
      </ul>
    </div>
  );
};
