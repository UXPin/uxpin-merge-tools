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

export const ArrowFunctionWithNamedExport: React.StatelessComponent<Props> = ({
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

ArrowFunctionWithNamedExport.defaultProps = {
  hidden: false,
  modifier: DEFAULT_MODIFIER,
};
