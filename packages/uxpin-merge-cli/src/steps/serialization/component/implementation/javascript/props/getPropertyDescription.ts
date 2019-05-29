const LINES_DELIMETER:string = '\n';
const UXPIN_JSDOC_TAG_PREFIX:string = '@uxpin';

export function getPropertyDescription(desc:string = ''):string {
  const lines:string[] = getLines(desc);

  const descLines:string[] = [];
  for (let i:number = 0; i < lines.length; i += 1) {
    const prevLine:string = lines[i - 1] || '';
    const line:string = lines[i];

    if (
      (line === '' && prevLine === '')
        || line.startsWith(UXPIN_JSDOC_TAG_PREFIX)
    ) {
      continue;
    }

    descLines.push(line);
  }

  return descLines.join(LINES_DELIMETER).trim();
}

function getLines(desc:string = ''):string[] {
  return desc
    .split(LINES_DELIMETER)
    .map((line:string) => line.trim());
}
