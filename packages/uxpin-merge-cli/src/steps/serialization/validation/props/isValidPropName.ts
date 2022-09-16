export function isValidPropName(prop: string): boolean {
  return /^(?!\d)[\w$]+$/.test(prop);
}
