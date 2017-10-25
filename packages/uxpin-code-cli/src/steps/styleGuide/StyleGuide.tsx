import * as React from 'react';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { ComponentContainer } from './component/ComponentContainer';

interface Props {
  components:ComponentDefinition[];
  library:{string:() => any};
}
// tslint:disable:variable-name
export const StyleGuide:React.SFC<Props> = ({ components, library }:Props) => {
  const componentNames:string[] = components.map((component) => component.name);

  return (
    <div>
      {components.map((component) => (
        <ComponentContainer componentNames={componentNames} library={library} {...component} />
      ))}
    </div>
  );
};
