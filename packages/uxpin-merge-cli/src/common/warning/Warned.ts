import { WarningDetails } from './WarningDetails';

export interface Warned<T> {
  result: T;
  warnings: WarningDetails[];
}
