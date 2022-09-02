export function removeNewLines(data: string): string {
  return data.replace(/\n/gm, '');
}
