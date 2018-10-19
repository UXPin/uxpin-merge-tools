export function flatMap<T, U>(inputs:ReadonlyArray<T>, getOutputs:(input:T, index:number) => ReadonlyArray<U>):U[] {
  return inputs.reduce<U[]>((result, input, index) => {
    return [].concat.apply(result, getOutputs(input, index));
  }, []);
}
