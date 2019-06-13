import React, { PropTypes } from 'react';
import { withI18n } from './hoc/withI18n';

/**
 * @uxpincomponent
 * @uxpinnamespace CustomNamespace
 */
export class ClassPrependedWithCommentToBeComposedWithHOC extends React.Component {
  render() {
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

ClassPrependedWithCommentToBeComposedWithHOC.propTypes = {
  appearance: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  i18n: PropTypes.string.isRequired,
};

export class DummyComponent extends React.Component {
  render() {
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

DummyComponent.propTypes = {
  appearance: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default withI18n(ClassPrependedWithCommentToBeComposedWithHOC);
