import ButtonWithIconAsProp from './ButtonWithIconAsProp';
import Button from './ButtonWithIconAsProp';
import * as React from 'react';
import IconStar from '../../icons/IconStar/IconStar';

export const primary = () => (
  <ButtonWithIconAsProp isPrimary>
    Click me
  </ButtonWithIconAsProp>
);

export const withIcon = () => (
  <ButtonWithIconAsProp iconStart={<IconStar uxpId="2" stroke="gray" strokeWidth={2} />} isPrimary>
    Click me
  </ButtonWithIconAsProp>
);

export const mixedChildren = () => (
  <ButtonWithIconAsProp isPrimary>
    Add to
    <IconStar stroke="gray" strokeWidth={2} />
    favourites
  </ButtonWithIconAsProp>
);

export const withUxpIds = () => (
  <ButtonWithIconAsProp uxpId="1" isPrimary>
    Add to favourites
  </ButtonWithIconAsProp>
);

export const withDomPrimitive = () => (
  <ButtonWithIconAsProp uxpId="1" isPrimary>
    <span>Add to favourites</span>
  </ButtonWithIconAsProp>
);

export const usingRenamingImport = () => (
  <Button uxpId="1" isPrimary>
    Add to favourites
  </Button>
);
