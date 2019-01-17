import * as React from 'react';
import IconStar from '../../../icons/IconStar/IconStar';
import ButtonWithIconAsProp from '../ButtonWithIconAsProp';

export default (
  <ButtonWithIconAsProp uxpId="1" iconStart={<IconStar uxpId="2" stroke="gray" strokeWidth={2} />} isPrimary>
    Click me
  </ButtonWithIconAsProp>
);
