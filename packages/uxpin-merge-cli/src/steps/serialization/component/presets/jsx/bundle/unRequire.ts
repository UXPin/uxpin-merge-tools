export function unRequire(name:string):void {
  delete require.cache[require.resolve(name)];
}
