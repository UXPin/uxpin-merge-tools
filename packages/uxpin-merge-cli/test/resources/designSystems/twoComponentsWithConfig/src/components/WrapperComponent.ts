export function WrapperComponent({ children }: any): string {
  // tslint:disable-next-line:no-console
  console.log('__MY_CUSTOM_WRAPPER_COMPONENT_IS_HERE__');
  return children;
}
