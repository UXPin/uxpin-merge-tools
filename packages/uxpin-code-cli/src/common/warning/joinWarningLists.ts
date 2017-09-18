import { WarningDetails } from './WarningDetails';

export function joinWarningLists(warningLists:WarningDetails[][], componentPath:string):WarningDetails[] {
  return warningLists.reduce((aggregator, warnings) => {
    [].push.apply(aggregator, warnings.map(fillSourcePath(componentPath)));
    return aggregator;
  }, [] as WarningDetails[]);
}

function fillSourcePath(sourcePath:string):(warning:WarningDetails) => WarningDetails {
  return (warning:WarningDetails) => ({ sourcePath, ...warning });
}
