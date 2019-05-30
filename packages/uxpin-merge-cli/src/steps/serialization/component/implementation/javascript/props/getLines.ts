export const LINES_DELIMETER:string = '\n';

export function getLines(desc:string = ''):string[] {
  return desc
    .split(LINES_DELIMETER)
    .map((line:string) => line.trim());
}
