import Chromeless from 'chromeless';

const DEFAULT_TIMEOUT:number = 5000;

export function waitForComponent(
  chromeless:Chromeless<any>,
  componentName:string,
  timeout:number = DEFAULT_TIMEOUT,
):Promise<void> {
  return chromeless.wait(`h3:value(${componentName})`, timeout);
}
