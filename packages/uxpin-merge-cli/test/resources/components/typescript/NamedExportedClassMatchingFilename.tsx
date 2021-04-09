import * as React from 'react';
import { withI18n } from './hoc/withI18n';

export interface Props {
  appearance:'secondary' | 'primary' | 'link';
  children?:string;
  i18n:string;
}

export class NamedExportedClassMatchingFilename
  extends React.Component<Props> {
  public render():JSX.Element {
    const { appearance, children, i18n } = this.props;

    return (
      <div>
        <button className={appearance}>
          {children} {i18n}
        </button>
      </div>
    );
  }
}
