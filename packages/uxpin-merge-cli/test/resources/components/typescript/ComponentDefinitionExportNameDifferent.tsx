import * as React from "react";

interface Props {
  children: string;
  disabled: boolean;
  onClick(): void;
}

const ComponentDefinitionExportNameDifferent = ({children = "gello"}:Props) => {
  return (
    <button>
      {children}
    </button>
  );
};

const NewComponentDefinitionExportNameDifferent = ComponentDefinitionExportNameDifferent

export default NewComponentDefinitionExportNameDifferent;