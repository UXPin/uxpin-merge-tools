import * as React from 'react';
import { I18nProps, withI18n } from './hoc/withI18n';

export interface Props {
  appearance: 'secondary' | 'primary' | 'link';
  children?: string;
}

export class ClassToBeComposedWithHOC extends React.Component<Props & I18nProps> {
  public render(): JSX.Element {
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

export default withI18n(ClassToBeComposedWithHOC);
