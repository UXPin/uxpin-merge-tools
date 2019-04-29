import * as React from 'react';
import { withI18n } from './hoc/withI18n';

export interface Props {
  appearance:'secondary' | 'primary' | 'link';
  children?:string;
  i18n:string;
}

/**
 * @uxpincomponent
 */
export function FunctionalComponentPrependedWithCommentToBeComposedWithHOC({ appearance, children, i18n }:Props):JSX.Element {
  return (
    <div>
      <button className={appearance}>
        {children} {i18n}
      </button>
    </div>
  );
};

export class DummyComponent extends React.Component<Props> {
  public render():JSX.Element {
    const { appearance, children } = this.props;

    return (
      <div>
        <button className={appearance}>
          {children}
        </button>
      </div>
    );
  }
}

export default withI18n(FunctionalComponentPrependedWithCommentToBeComposedWithHOC);
