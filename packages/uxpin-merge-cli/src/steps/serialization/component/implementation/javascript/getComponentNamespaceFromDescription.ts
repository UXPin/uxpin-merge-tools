import { CommentTags } from '../../CommentTags';
import { getComponentNamespaceImportSlug } from '../getComponentNamespaceImportSlug';
import { ComponentNamespace } from './../../ComponentDefinition';
import { getCommentTagInlineValue } from './getCommentTagInlineValue';

export function getComponentNamespaceFromDescription(
  componentName: string,
  description: string
): ComponentNamespace | undefined {
  if (!description) {
    return;
  }

  const namespaceName: string | undefined = getCommentTagInlineValue(description, CommentTags.UXPIN_NAMESPACE);

  if (!namespaceName) {
    return;
  }

  return {
    importSlug: getComponentNamespaceImportSlug(namespaceName, componentName),
    name: namespaceName,
  };
}
