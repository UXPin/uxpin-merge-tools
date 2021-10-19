import * as ts from 'typescript';
import { ComponentDocUrl } from '../../../ComponentDefinition';
import { getUXpinDocUrlComment } from '../comments/getUXpinDocUrlComment';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';


export function getComponentDocUrl(component:ComponentDeclaration):ComponentDocUrl | undefined {
    const componentDocUrl:ts.JSDocTag | undefined = getUXpinDocUrlComment(component);
    
    if (!componentDocUrl?.comment) {
      return;
    }
  
    return {
      url: componentDocUrl.comment,
    };
  }




