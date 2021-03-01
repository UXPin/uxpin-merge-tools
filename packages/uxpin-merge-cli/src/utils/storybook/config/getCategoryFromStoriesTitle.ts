// Storybook supports more than 1 level of categorization, but we don't
// So, just taking the first one as a category.
export function getCategoryFromStoriesTitle(title:string):string {
  const parts:string[] = title.split('/');
  return parts.length > 1 ? parts[0] : 'Uncategorized';
}
