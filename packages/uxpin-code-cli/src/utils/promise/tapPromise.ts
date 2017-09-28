export function tapPromise<T>(fn:(a:T) => Promise<any>):(a:T) => Promise<T> {
  return (val) => Promise.resolve(val).then(fn).then(() => val);
}
