import { NAMESPACE_NAME_DELIMITER } from '../implementation/typescript/component/getComponentNamespace';

export function getComponentNamespaceParents(name:string):string[] {
  const parts:string[] = name.split(NAMESPACE_NAME_DELIMITER);

  if (parts.length <= 1) {
    return [];
  }

  return parts
    .slice(0, -1)
    .map((part, index, newParts) => {
      return [
        ...newParts.slice(0, index),
        part,
      ].join(NAMESPACE_NAME_DELIMITER);
    });
}
