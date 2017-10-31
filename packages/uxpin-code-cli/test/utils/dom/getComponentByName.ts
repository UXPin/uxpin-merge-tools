export function getComponentByName(name:string):string | null {
  const node:HTMLElement | undefined = Array.from(document.querySelectorAll<'header'>('h3' as 'header'))
    .find((el) => el.innerText === name);

  if (!node) {
    return null;
  }

  if (!node.parentElement) {
    return null;
  }

  return node.parentElement.innerHTML;
}
