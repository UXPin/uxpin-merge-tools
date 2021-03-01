// `component` attribute on stories file is an optional(although it is recommended)
// So, taking a component name from title.
export function getComponentNameFromStoriesTitle(title:string):string {
  const parts:string[] = title.split('/');
  return parts[parts.length - 1];
}
