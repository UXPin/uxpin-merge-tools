export function getBuiltValue<T>(value:T|Builder<T>, builder:new () => Builder<T>):T {
  if (value instanceof builder) {
    return value.build();
  }
  return value;
}

interface Builder<T> {
  build():T;
}
