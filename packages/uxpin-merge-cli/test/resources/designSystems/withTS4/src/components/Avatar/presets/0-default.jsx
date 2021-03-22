import * as React from 'react';
import { Test } from '../../../test';
import Avatar from '../Avatar';

const test = new Test();
test.name = 'abc';
// tslint:disable-next-line:no-magic-numbers
test.abc = 123;

export default (
  <Avatar
    uxpId="1"
    size="small"
    imageUrl="https://picsum.photos/100/100?image=1027"
    test={test}
    user={{ id: 1, name:'abc' }}
  />
);
