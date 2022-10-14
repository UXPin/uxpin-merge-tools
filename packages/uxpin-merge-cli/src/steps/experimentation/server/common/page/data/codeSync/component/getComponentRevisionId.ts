export function getComponentRevisionId(revisionId: string, componentId: string): string {
  return `${revisionId}_${componentId}`;
}
