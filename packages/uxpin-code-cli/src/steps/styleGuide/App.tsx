import { join } from 'path';
import * as React from 'react';
import { LIBRARY_OUTPUT_PATH } from '../building/config/getConfig';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { ComponentContainer } from './component/ComponentContainer';

interface Props {
  components:ComponentDefinition[];
}
// tslint:disable:variable-name
export const App:React.SFC<Props> = ({ components }:Props) => {
  const imports:string[] = components.map((component) => getImport(component.name));

  return (
    <div>
      {components.map((component) => (
        <ComponentContainer imports={imports} {...component} />
      ))}
    </div>
  );
};

function getImport(componentName:string):string {
  return `const { ${componentName} } = require('${join(process.cwd(), LIBRARY_OUTPUT_PATH)}');`;
}
