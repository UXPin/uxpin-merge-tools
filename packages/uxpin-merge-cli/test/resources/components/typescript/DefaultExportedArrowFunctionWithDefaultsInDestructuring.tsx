import * as React from 'react';

export interface Props {
  children?: React.ReactNode;
  modifier?: string;
  hidden: boolean;
}

function labelID(id: string): string {
  return `${id}Label`;
}

const DEFAULT_MODIFIER = 'neutral';

export default ({ children, modifier = DEFAULT_MODIFIER, hidden = false }: Props) => {
  return (
    <div>
      <button className={`${hidden ? 'hidden' : ''} ${modifier}`}>{children}</button>
    </div>
  );
};
