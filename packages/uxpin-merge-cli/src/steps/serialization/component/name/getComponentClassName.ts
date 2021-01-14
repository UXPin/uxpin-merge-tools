export function getComponentClassName(fileName:string):string {
  const name:string = fileName.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('');

  // Storybook component names will end in .stories.js
  if (name.endsWith('.stories')) {
    return name.replace(/\.stories$/, '');
  }

  return name;
}
