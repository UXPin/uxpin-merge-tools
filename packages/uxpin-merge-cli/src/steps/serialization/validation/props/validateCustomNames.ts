import { Warned } from '../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../../component/implementation/ComponentPropertyDefinition';

interface PropsCustomNamesMap {
  [key:string]:boolean;
}

export function validateCustomNames(props:Warned<ComponentPropertyDefinition>[]):Warned<ComponentPropertyDefinition>[] {
  const customNames:PropsCustomNamesMap = {};
  const names:string[] = props.map((prop:Warned<ComponentPropertyDefinition>) => prop.result.name);

  props.forEach((prop:Warned<ComponentPropertyDefinition>) => {
    const { customName, name } = prop.result;

    if (!customName) {
      return;
    }

    if (customName in customNames) {
      prop.warnings.push({ message: `Duplicated custom property name ("${customName}") for "${name}"` });
    }

    if (names.includes(customName)) {
      prop.warnings.push({ message: `Custom property name ("${customName}") for "${name}" matches existing property name` });
    }

    customNames[customName] = true;
  });

  return props;
}
