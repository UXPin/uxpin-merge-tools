import * as React from 'react';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { ComponentContainer } from './component/ComponentContainer';

interface Props {
  components:ComponentDefinition[];
}
// tslint:disable:variable-name
export const App:React.SFC<Props> = ({ components }:Props) => {
  return (
    <div>
      {components.map((component) => (
        <ComponentContainer {...component} />
      ))}
    </div>
  );
};
