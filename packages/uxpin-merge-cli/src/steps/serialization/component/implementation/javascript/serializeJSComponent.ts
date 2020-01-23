import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateProps } from '../../../validation/validateProps';
import { validateWrappers } from '../../../validation/validateWrappers';
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
    const properties:PropDefinitionSerializationResult[] = await getComponentProperties(parsed.props);
    const name:string = getComponentName(implInfo.path, parsed);
    const wrappers:Warned<ComponentWrapper[]> = getComponentWrappers(parsed, implInfo);

    return {
      name,
      properties,
      wrappers,
      ...getValuesFromComments(name, parsed),
    };
  };
}

async function getComponentProperties(props:ComponentDoc['props']):Promise<PropDefinitionSerializationResult[]> {
  const propsDefinition:Array<Promise<Warned<ComponentPropertyDefinition>>> = toPairs(props)
    .map(([propName, propType]) => convertPropItemToPropertyDefinition(propName, propType));

  return validateProps(await Promise.all(propsDefinition));
}

function getComponentWrappers(
  parsed:ComponentDoc,
  implInfo:ComponentImplementationInfo,
):Warned<ComponentWrapper[]> {
  const jsDocTags:string[] = getJSDocTagsArrayFromString(parsed.description);
  const wrappersTag:string = getCommentTag(CommentTags.UXPIN_WRAPPERS, jsDocTags) || '';

  const wrappers:ComponentWrapper[] = parseWrapperAnnotation(wrappersTag);

  return validateWrappers(wrappers, implInfo);
}

function getValuesFromComments(
  name:string,
  parsed:ComponentDoc,
):Pick<PartialResult, 'namespace'> {
  const jsDocTags:string[] = getJSDocTagsArrayFromString(parsed.description);
  const namespaceTag:string = getCommentTag(CommentTags.UXPIN_NAMESPACE, jsDocTags) || '';

  return {
    namespace: getComponentNamespaceFromDescription(name, namespaceTag),
  };
}

function thunkGetSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ name, namespace, properties, wrappers }) => ({
    result: {
      name,
      namespace,
      properties: properties.map((p) => p.result),
      wrappers: wrappers.result,
    },
    warnings: joinWarningLists(
      [
        ...properties.map((p) => p.warnings),
        wrappers.warnings,
      ],
      path,
    ),
  });
}

interface PartialResult {
  name:string;
  namespace?:ComponentNamespace;
  properties:PropDefinitionSerializationResult[];
  wrappers:Warned<ComponentWrapper[]>;
}
