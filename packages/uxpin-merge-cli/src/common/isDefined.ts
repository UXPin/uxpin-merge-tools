export function isDefined<T>(a:T | undefined):a is T {
  return typeof a !== 'undefined' && a !== null;
}
