export const INDENTATION_CHAR = `  `;

export function generatePropertyValuePair(property: string, value: any): string {
  let pair = '';

  switch (typeof value) {
    case 'function':
      pair = `${property}={() => {}}`;
      break;
    case 'object':
      pair = `${property}={${JSON.stringify(value)}}`;
      break;
    case 'boolean':
      pair = value ? `${property}` : `${property}={false}`;
      break;
    case 'string':
      pair = `${property}=${JSON.stringify(value)}`;
      break;
    default:
      pair = `${property}={${value}}`;
      break;
  }

  return `${INDENTATION_CHAR}${INDENTATION_CHAR}${pair}`;
}
