export function parseValue(javascriptValue:string):Promise<any> {
  return new Promise((resolve) => {
  	const resolver:() => any = new Function(`return ${javascriptValue}`) as () => any;
    resolve(resolver());
  });
}
