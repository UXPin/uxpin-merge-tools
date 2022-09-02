export function getDesignSystemId(revisionId: string): string {
  const [designSystemId] = revisionId.split('_');
  return designSystemId;
}
