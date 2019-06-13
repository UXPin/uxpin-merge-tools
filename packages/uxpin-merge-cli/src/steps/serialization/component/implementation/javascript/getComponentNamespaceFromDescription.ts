import { getComponentNamespaceImportSlug } from '../getComponentNamespaceImportSlug';
import { ComponentNamespace } from './../../ComponentDefinition';

const annotationRegexp:RegExp = /\@uxpinnamespace\s+([a-z0-9\._]+)\s*\t*$/im;

export function getComponentNamespaceFromDescription(
  componentName:string, description:string,
):ComponentNamespace | undefined {
  if (!description) {
    return;
  }

  const matches:string[] | null = description.match(annotationRegexp);

  if (!matches) {
    return;
  }

  const namespaceName:string = matches[1];

  return {
    importSlug: getComponentNamespaceImportSlug(namespaceName, componentName),
    name: namespaceName,
  };
}
