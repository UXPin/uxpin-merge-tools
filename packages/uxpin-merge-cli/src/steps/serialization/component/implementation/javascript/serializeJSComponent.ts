import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../discovery/component/ComponentInfo';
import { validateWrappers } from '../../../validation/validateWrappers';
import { getCommentTag } from '../../comments/getCommentTag';
import { getJSDocTagsArrayFromString } from '../../comments/getJSDocTagsArrayFromString';
import { CommentTags } from '../../CommentTags';
import { ComponentNamespace } from '../../ComponentDefinition';
import { serializeAndValidateParsedProperties } from '../../props/serializeAndValidateParsedProperties';
import { ComponentWrapper } from '../../wrappers/ComponentWrapper';
import { parseWrapperAnnotation } from '../../wrappers/parseWrapperAnnotation';
import { ImplSerializationResult } from '../ImplSerializationResult';
import { PropDefinitionParsingResult } from '../PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';
import { getComponentDocUrlFromDescription } from './getComponentDocUrlFromDescription';
import { getComponentName } from './getComponentName';
import { getComponentNamespaceFromDescription } from './getComponentNamespaceFromDescription';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';
import { isDefaultExported } from './isDefaultExported';
import { parsePropertyItem } from './parsePropertyItem';

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
    const defaultExported:boolean = isDefaultExported(implInfo.path, name);

    return {
      defaultExported,
      name,
      properties,
      wrappers,
      ...getValuesFromComments(name, parsed),
    };
  };
}

async function getComponentProperties(props:ComponentDoc['props']):Promise<PropDefinitionSerializationResult[]> {
  const propertyParsingPromises:Array<Promise<PropDefinitionParsingResult>> = toPairs(props)
    .map(([propName, propType]) => parsePropertyItem(propName, propType));
  const parsedProps:PropDefinitionParsingResult[] = await Promise.all(propertyParsingPromises);
  return serializeAndValidateParsedProperties(parsedProps);
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
):Pick<PartialResult, 'namespace' | 'componentDocUrl'> {
  const jsDocTags:string[] = getJSDocTagsArrayFromString(parsed.description);
  const namespaceTag:string = getCommentTag(CommentTags.UXPIN_NAMESPACE, jsDocTags) || '';
  const componentDocUrlTag:string = getCommentTag(CommentTags.UXPIN_DOC_URL, jsDocTags) || '';

  const namespace:ComponentNamespace | undefined = getComponentNamespaceFromDescription(name, namespaceTag);
  const componentDocUrl:string | undefined = getComponentDocUrlFromDescription(componentDocUrlTag);
  
  return { namespace, componentDocUrl };
}

function thunkGetSummaryResult(path:string):(propResults:PartialResult) => ImplSerializationResult {
  return ({ properties, wrappers, ...directProps }) => ({
    result: {
      ...directProps,
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
  componentDocUrl?:string;
  properties:PropDefinitionSerializationResult[];
  wrappers:Warned<ComponentWrapper[]>;
  defaultExported:boolean;
}
