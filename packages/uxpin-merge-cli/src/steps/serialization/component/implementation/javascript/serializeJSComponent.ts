import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateProps } from '../../../validation/validateProps';
import { getCommentTag } from '../../comments/getCommentTag';
import { getJSDocTagsArrayFromString } from '../../comments/getJSDocTagsArrayFromString';
import { CommentTags } from '../../CommentTags';
import { ComponentNamespace } from '../../ComponentDefinition';
import { ComponentWrapper } from '../../wrappers/ComponentWrapper';
import { parseWrapperAnnotation } from '../../wrappers/parseWrapperAnnotation';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { convertPropItemToPropertyDefinition } from './convertPropItemToPropertyDefinition';
import { getComponentName } from './getComponentName';
import { getComponentNamespaceFromDescription } from './getComponentNamespaceFromDescription';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';

export function serializeJSComponent(component:ComponentImplementationInfo):Promise<ImplSerializationResult> {
  return getDefaultComponentFrom(component.path)
    .then(thunkGetMetadata(component))
    .then(thunkGetSummaryResult(component.path));
}

function thunkGetMetadata(implInfo:ComponentImplementationInfo):(parsed:ComponentDoc) => Promise<PartialResult> {
  return async (parsed) => {
    const properties:PropDefinitionSerializationResult[] = await thunkGetComponentProperties(parsed.props);
    const name:string = getComponentName(implInfo.path, parsed);

    return {
      name,
      properties,
      ...thunkGetValuesFromComments(name, parsed),
    };
  };
}

async function thunkGetComponentProperties(props:ComponentDoc['props']):Promise<PropDefinitionSerializationResult[]> {
  const propsDefinition:Array<Promise<Warned<ComponentPropertyDefinition>>> = toPairs(props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType));

  return validateProps(await Promise.all(propsDefinition));
}

function thunkGetValuesFromComments(name:string, parsed:ComponentDoc):Pick<PartialResult, 'namespace' | 'wrappers'> {
  const jsDocTags:string[] = getJSDocTagsArrayFromString(parsed.description);
  const namespaceTag:string = getCommentTag(CommentTags.UXPIN_NAMESPACE, jsDocTags) || '';
  const wrappersTag:string = getCommentTag(CommentTags.UXPIN_WRAPPERS, jsDocTags) || '';

  return {
    namespace: getComponentNamespaceFromDescription(name, namespaceTag),
    wrappers: parseWrapperAnnotation(wrappersTag),
  };
}

function thunkGetSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ name, namespace, properties, wrappers }) => ({
    result: {
      name,
      namespace,
      properties: properties.map((p) => p.result),
      wrappers,
    },
    warnings: joinWarningLists(properties.map((p) => p.warnings), path),
  });
}

interface PartialResult {
  name:string;
  namespace?:ComponentNamespace;
  properties:PropDefinitionSerializationResult[];
  wrappers:ComponentWrapper[];
}
