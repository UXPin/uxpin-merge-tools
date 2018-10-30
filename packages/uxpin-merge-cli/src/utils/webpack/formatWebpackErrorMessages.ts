import { Stats } from 'webpack';

export function formatWebpackErrorMessages(stats:Stats):string {
  const errors:any = stats.toJson({ errors: true });
  return errors.errors
    .filter(withoutModuleBuildFailed)
    .join('\n');
}

function withoutModuleBuildFailed(error:string):boolean {
  return error.indexOf('Module build failed') === -1;
}
