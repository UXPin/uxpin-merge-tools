import { Warned } from '../../../../common/warning/Warned';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../component/implementation/ComponentPropertyDefinition';
import { isCustomTypeAllowedForType } from './isCustomTypeAllowedForType';

export function validateCustomTypes(
  props:Array<Warned<ComponentPropertyDefinition>>,
):Array<Warned<ComponentPropertyDefinition>> {
  const result:Array<Warned<ComponentPropertyDefinition>> = props.map((prop:Warned<ComponentPropertyDefinition>) => {
    const { customType, type } = prop.result;

    if (!customType || !type) {
      return prop;
    }

    if (!isCustomTypeAllowedForType(customType.name, type.name)) {
      const result:ComponentPropertyDefinition = {
        ...prop.result,
      };

      delete result.customType;

      const warnings:WarningDetails[] = [
        { message: `Custom type "${customType.name}" can not be applied to "${type.name}" ("${prop.result.name}").` },
      ];

      return {
        result,
        warnings,
      };
    }

    return prop;
  });

  return result;
}
