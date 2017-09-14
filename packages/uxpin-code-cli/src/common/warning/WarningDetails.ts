export interface WarningDetails {
  message:string;
  sourceFilePath?:string;
  originalError?:Error;
}
