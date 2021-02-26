export function classNames(object) {
  return Object.keys(object).filter(key => object[key]).join(' ');
}
