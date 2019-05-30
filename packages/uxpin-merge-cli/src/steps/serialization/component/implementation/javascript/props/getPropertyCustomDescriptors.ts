import { ComponentPropertyCustomDescriptors } from '../../ComponentPropertyDefinition';
import { getLines, LINES_DELIMETER } from './getLines';
import { parseTags } from './parseTags';

export function getPropertyCustomDescriptors(desc:string):ComponentPropertyCustomDescriptors {
  const lines:string[] = getLines(desc);
  const tags:string[] = getTags(lines);

  return parseTags(tags);
}

function getTags(lines:string[]):string[] {
  return lines.reduce((result:string[], line:string) => {
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
  }, []);
}
