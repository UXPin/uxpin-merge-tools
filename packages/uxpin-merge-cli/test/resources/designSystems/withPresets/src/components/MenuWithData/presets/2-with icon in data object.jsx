import * as React from 'react';
import IconStar from '../../../icons/IconStar/IconStar';
import MenuWithData from '../MenuWithData';

export default (
  <MenuWithData uxpId="1" data={[
    { icon: <IconStar uxpId="2" stroke="gray" strokeWidth={2} />, title: 'item 1', subtitle: 'this is item 1' },
    { icon: <IconStar uxpId="3" stroke="gray" strokeWidth={2} />, title: 'item 2', subtitle: 'this is item 2' },
    {
      icon: [
        <IconStar uxpId="4" stroke="gray" strokeWidth={2} />,
        <IconStar uxpId="5" stroke="gray" strokeWidth={2} />,
      ],
      title: 'item 3',
      subtitle: 'this is item 3',
    },
  ]} />
);
