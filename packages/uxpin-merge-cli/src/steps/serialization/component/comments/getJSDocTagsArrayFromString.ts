import { getLines, LINES_DELIMETER } from './getLines';

export function getJSDocTagsArrayFromString(value:string):string[] {
  const lines:string[] = getLines(value);

  return lines
    .reduce((result:string[], line:string) => {
      const isTagLine:boolean = line.startsWith('@');
      if (!isTagLine && !result.length) {
        return result;
      }

      let newLine:string;
      if (!isTagLine) {
        newLine = result.pop() || '';
        newLine = [newLine, line].join(LINES_DELIMETER);
      } else {
        newLine = line;
      }

      result.push(newLine);

      return result;
    }, [])
    .map((line:string) => line.trim());
}
