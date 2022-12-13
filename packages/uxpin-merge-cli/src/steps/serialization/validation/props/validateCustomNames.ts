import { Warned } from '../../../../common/warning/Warned';
import { WarningDetails } from '../../../../common/warning/WarningDetails';
import { ComponentPropertyDefinition } from '../../component/implementation/ComponentPropertyDefinition';

interface PropsCustomNamesMap {
  [key: string]: boolean;
}

export function validateCustomNames(
  props: Array<Warned<ComponentPropertyDefinition>>
): Array<Warned<ComponentPropertyDefinition>> {
  const customNames: PropsCustomNamesMap = {};
  const names: string[] = props.map((prop: Warned<ComponentPropertyDefinition>) => prop.result.name);

  const result: Array<Warned<ComponentPropertyDefinition>> = props.map((prop: Warned<ComponentPropertyDefinition>) => {
    const { customName, name } = prop.result;

    if (!customName) {
      return prop;
    }

    const warnings: WarningDetails[] = [...prop.warnings];

    if (customName in customNames) {
      warnings.push({
        message: `Duplicated custom property name ("${customName}") for "${name}"`,
      });
    }

    if (names.includes(customName)) {
      warnings.push({
        message: `Custom property name ("${customName}") for "${name}" matches existing property name`,
      });
    }

    customNames[customName] = true;

    return {
      ...prop,
      warnings,
    };
  });

  return result;
}
