import { WarningDetails } from './WarningDetails';

export function joinWarningLists(warningLists:WarningDetails[][], componentPath:string):WarningDetails[] {
  return warningLists.reduce((warningList, warnings) => {
    [].push.apply(warningList, warnings.map(fillSourcePath(componentPath)));
    return warningList;
  }, [] as WarningDetails[]);
}

function fillSourcePath(sourcePath:string):(warning:WarningDetails) => WarningDetails {
  return (warning:WarningDetails) => ({ sourcePath, ...warning });
}
