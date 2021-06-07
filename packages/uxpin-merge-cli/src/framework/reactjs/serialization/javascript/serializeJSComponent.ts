import { toPairs } from 'lodash';
import { ComponentDoc } from 'react-docgen-typescript/lib';
import { joinWarningLists } from '../../../../common/warning/joinWarningLists';
import { Warned } from '../../../../common/warning/Warned';
import { ComponentImplementationInfo } from '../../../../steps/discovery/component/ComponentInfo';
import { getCommentTag } from '../../../../steps/serialization/component/comments/getCommentTag';
import { getJSDocTagsArrayFromString } from '../../../../steps/serialization/component/comments/getJSDocTagsArrayFromString';
import { CommentTags } from '../../../../steps/serialization/component/CommentTags';
import { ComponentNamespace } from '../../../../steps/serialization/component/ComponentDefinition';
import { ImplSerializationResult } from '../../../../steps/serialization/component/implementation/ImplSerializationResult';
import { getComponentName } from '../../../../steps/serialization/component/implementation/javascript/getComponentName';
import { getComponentNamespaceFromDescription } from '../../../../steps/serialization/component/implementation/javascript/getComponentNamespaceFromDescription';
import { isDefaultExported } from '../../../../steps/serialization/component/implementation/javascript/isDefaultExported';
import { PropDefinitionParsingResult } from '../../../../steps/serialization/component/implementation/PropDefinitionParsingResult';
import { PropDefinitionSerializationResult } from '../../../../steps/serialization/component/implementation/PropDefinitionSerializationResult';
import { serializeAndValidateParsedProperties } from '../../../../steps/serialization/component/props/serializeAndValidateParsedProperties';
import { ComponentWrapper } from '../../../../steps/serialization/component/wrappers/ComponentWrapper';
import { parseWrapperAnnotation } from '../../../../steps/serialization/component/wrappers/parseWrapperAnnotation';
import { validateWrappers } from '../../../../steps/serialization/validation/validateWrappers';
import { getDefaultComponentFrom } from './getDefaultComponentFrom';
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
):Pick<PartialResult, 'namespace'> {
  const jsDocTags:string[] = getJSDocTagsArrayFromString(parsed.description);
  const namespaceTag:string = getCommentTag(CommentTags.UXPIN_NAMESPACE, jsDocTags) || '';

  const namespace:ComponentNamespace | undefined = getComponentNamespaceFromDescription(name, namespaceTag);

  if (!namespace) {
    return {};
  }

  return {
    namespace,
  };
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
  properties:PropDefinitionSerializationResult[];
  wrappers:Warned<ComponentWrapper[]>;
  defaultExported:boolean;
}
