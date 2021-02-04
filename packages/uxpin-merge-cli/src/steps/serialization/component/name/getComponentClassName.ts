export function getComponentClassName(fileName:string):string {
  return fileName.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');
}
