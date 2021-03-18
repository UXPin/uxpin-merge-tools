import * as React from 'react';

export interface Props {
  children?:React.ReactNode;
  id:string;
  appearance:string;
  modifier?:string;
  hidden:boolean;
}

function labelID(id:string):string {
  return `${id}Label`;
}

/**
 * @uxpincomponent
 */
function DefaultExportedWithAsDefaultStatement({children,
  id,
  appearance,
  modifier,
  hidden,
}:Props):JSX.Element {
  return (
    <div>
      <button id={labelID(id)}
              className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

const DEFAULT_MODIFIER:string = 'neutral';

DefaultExportedWithAsDefaultStatement.defaultProps = {
  hidden: false,
  modifier: DEFAULT_MODIFIER,
};

export { DefaultExportedWithAsDefaultStatement as default };
