import * as React from 'react';

export interface Props {
  children?: React.ReactNode;
  id: string;
  appearance: string;
  modifier?: string;
  hidden: boolean;
}

function labelID(id: string): string {
  return `${id}Label`;
}

const ArrowFunctionWithSeparateNamedExportDeclaration: React.StatelessComponent<Props> = ({
  children,
  id,
  appearance,
  modifier,
  hidden,
}) => {
  return (
    <div>
      <button id={labelID(id)} className={`${hidden ? 'hidden' : ''} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

const DEFAULT_MODIFIER = 'neutral';

ArrowFunctionWithSeparateNamedExportDeclaration.defaultProps = {
  hidden: false,
  modifier: DEFAULT_MODIFIER,
};

export { ArrowFunctionWithSeparateNamedExportDeclaration };
