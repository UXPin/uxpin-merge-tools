import { WarningDetails } from './WarningDetails';

export function joinWarningLists(warningLists:WarningDetails[][], componentPath?:string):WarningDetails[] {
  return warningLists.reduce((warningList, warnings) => {
    let warningsToJoin:WarningDetails[] = warnings;
    if (componentPath) {
      warningsToJoin = warnings.map(thunkFillSourcePath(componentPath));
    }
    [].push.apply(warningList, warningsToJoin);
    return warningList;
  }, [] as WarningDetails[]);
}

function thunkFillSourcePath(sourcePath:string):(warning:WarningDetails) => WarningDetails {
  return (warning:WarningDetails) => ({ sourcePath, ...warning });
}
