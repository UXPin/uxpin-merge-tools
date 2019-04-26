import * as React from 'react';
import { withI18n } from './hoc/withI18n';

export interface Props {
  appearance:'secondary' | 'primary' | 'link';
  children?:string;
  i18n:string;
}

export function DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC({ appearance, children, i18n }:Props):JSX.Element {
  return (
    <div>
      <button className={appearance}>
        {children} {i18n}
      </button>
    </div>
  );
};

export default withI18n(DefaultExportedFunctionalComponentMatchingFilenameComposedWithHOC);
