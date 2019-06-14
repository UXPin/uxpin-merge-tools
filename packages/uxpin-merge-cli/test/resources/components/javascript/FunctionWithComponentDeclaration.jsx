import React, { PropTypes } from 'react';
import { withI18n } from './hoc/withI18n';

function labelID(id) {
  return `${id}Label`;
}

const DummyFunctionComponent = ({ children, id, appearance, modifier, hidden }) => {
  return (
    <div>
      <button id={labelID(id)}
              className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

DummyFunctionComponent.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
  modifier: PropTypes.oneOf(['neutral', 'danger', 'positive']),
  hidden: PropTypes.bool.isRequired,
};

DummyFunctionComponent.defaultProps = {
  hidden: false,
  modifier: 'neutral',
};

/**
 * @uxpincomponent
 */
const FunctionWithComponentDeclarationAndCustomName = ({ children, id, appearance, modifier, hidden }) => {
  return (
    <div>
      <button id={labelID(id)}
              className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

FunctionWithComponentDeclarationAndCustomName.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
  modifier: PropTypes.oneOf(['neutral', 'danger', 'positive']),
  hidden: PropTypes.bool.isRequired,
};

FunctionWithComponentDeclarationAndCustomName.defaultProps = {
  hidden: false,
  modifier: 'neutral',
};

export default withI18n(FunctionWithComponentDeclarationAndCustomName);
