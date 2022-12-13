import { getLines, LINES_DELIMETER } from '../../../comments/getLines';

const GENERAL_JSDOC_TAG_PREFIX = '@';
const UXPIN_JSDOC_TAG_PREFIX = '@uxpin';

export function getPropertyDescription(desc = ''): string {
  const lines: string[] = getLines(desc);

  const descLines: string[] = [];
  let isUXPinTagOpen = false;
  for (let i = 0; i < lines.length; i += 1) {
    const prevLine: string = lines[i - 1] || '';
    const line: string = lines[i];

    isUXPinTagOpen =
      line.startsWith(UXPIN_JSDOC_TAG_PREFIX) || (isUXPinTagOpen && !line.startsWith(GENERAL_JSDOC_TAG_PREFIX));

    if ((line === '' && prevLine === '') || isUXPinTagOpen) {
      continue;
    }

    descLines.push(line);
  }

  return descLines.join(LINES_DELIMETER).trim();
}
