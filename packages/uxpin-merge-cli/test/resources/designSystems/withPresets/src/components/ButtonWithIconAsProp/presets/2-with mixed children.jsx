import * as React from 'react';
import IconStar from '../../../icons/IconStar/IconStar';
import ButtonWithIconAsProp from '../ButtonWithIconAsProp';

export default (
  <ButtonWithIconAsProp uxpId="1" isPrimary>
    Add to
    <IconStar uxpId="2" stroke="gray" strokeWidth={2} />
    favourites
  </ButtonWithIconAsProp>
);
