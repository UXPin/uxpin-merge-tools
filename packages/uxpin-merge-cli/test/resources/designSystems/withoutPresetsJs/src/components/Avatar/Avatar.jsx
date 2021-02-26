import PropTypes from 'prop-types';
import React from 'react';
import { PureComponent } from 'react';

export default class Avatar extends PureComponent {
  static propTypes = {
    size: PropTypes.oneOf(['xs', 's', 'l', 'xl']).isRequired,
    imageUrl: PropTypes.string.isRequired,
  };

  static defaultProps = {
    size: '',
  };

  render() {
    const { imageUrl, size } = this.props;
    return (
      <div className={size}>
        <img src={imageUrl} alt="Avatar" /> {size}
      </div>
    );
  }
}
