const LINES_DELIMETER:string = '\n';
const GENERAL_JSDOC_TAG_PREFIX:string = '@';
const UXPIN_JSDOC_TAG_PREFIX:string = '@uxpin';

export function getPropertyDescription(desc:string = ''):string {
  const lines:string[] = getLines(desc);

  const descLines:string[] = [];
  let isUXPinTagOpen:boolean = false;
  for (let i:number = 0; i < lines.length; i += 1) {
    const prevLine:string = lines[i - 1] || '';
    const line:string = lines[i];

    isUXPinTagOpen = line.startsWith(UXPIN_JSDOC_TAG_PREFIX)
      || isUXPinTagOpen && !line.startsWith(GENERAL_JSDOC_TAG_PREFIX);

    if (
      (line === '' && prevLine === '')
        || isUXPinTagOpen
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
