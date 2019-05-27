const LINES_DELIMETER:string = '\n';

export function getPropertyDescription(desc:string = ''):string {
  const lines:string[] = getLines(desc);

  const descLines:string[] = [];
  for (let i:number = 0; i < lines.length; i += 1) {
    const prevLine:string = lines[i - 1] || '';
    const line:string = lines[i];

    if (line === '' && prevLine === '') {
      continue;
    }

    if (line.startsWith('@')) {
      break;
    }

    descLines.push(line);
  }

  return descLines.join(LINES_DELIMETER).trim();
}

function getLines(desc:string):string[] {
  return desc
    .split(LINES_DELIMETER)
    .map((line:string) => line.trim());
}
