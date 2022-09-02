import { stringifyWarnings } from '../../common/warning/stringifyWarnings';
import { Warned } from '../../common/warning/Warned';
import { DesignSystemSnapshot } from '../../steps/serialization/DesignSystemSnapshot';

export function printSerializationWarnings({ warnings }: Warned<DesignSystemSnapshot>): void {
  console.log(stringifyWarnings(warnings));
}
