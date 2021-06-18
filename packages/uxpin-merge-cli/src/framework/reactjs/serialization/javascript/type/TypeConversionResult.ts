import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';

export type TypeConversionResult = Warned<Pick<ComponentPropertyDefinition, 'type'>>;
