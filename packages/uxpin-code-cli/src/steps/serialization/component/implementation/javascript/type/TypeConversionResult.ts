import { Warned } from '../../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';

export type TypeConversionResult = Warned<Pick<ComponentPropertyDefinition, 'type'>>;
