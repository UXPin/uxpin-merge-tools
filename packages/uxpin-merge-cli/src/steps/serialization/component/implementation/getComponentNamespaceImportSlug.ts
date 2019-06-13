export const NAMESPACE_NAME_DELIMITER:string = '.';
export const NAMESPACE_IMPORT_SLUG_DELIMITER:string = '_';

export function getComponentNamespaceImportSlug(namespaceName:string, componentName:string):string {
  return [
    ...namespaceName.split(NAMESPACE_NAME_DELIMITER),
    componentName,
  ].join(NAMESPACE_IMPORT_SLUG_DELIMITER);
}
