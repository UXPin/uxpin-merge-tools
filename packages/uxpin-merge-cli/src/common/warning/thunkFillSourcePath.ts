import { WarningDetails } from './WarningDetails';

export function thunkFillSourcePath(sourcePath:string):(warning:WarningDetails) => WarningDetails {
  return (warning:WarningDetails) => ({ sourcePath, ...warning });
}
