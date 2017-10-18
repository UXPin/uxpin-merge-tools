import * as React from 'react';
import { renderToString } from 'react-dom/server';

// tslint:disable:variable-name
export function getHtmlString<Props>(Component:React.SFC<Props>|React.ComponentClass<Props>,
  props:Partial<Props> = {}):string {

  return renderToString(<Component {...props} />);
}
