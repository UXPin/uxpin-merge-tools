export const LINES_DELIMETER = '\n';

export function getLines(desc = ''): string[] {
  return desc
    .trim()
    .split(LINES_DELIMETER)
    .map((line: string) => line.trim());
}
