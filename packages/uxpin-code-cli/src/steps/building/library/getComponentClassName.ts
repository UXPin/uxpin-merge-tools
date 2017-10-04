export function getComponentClassName(componentName:string):string {
  return componentName.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}
