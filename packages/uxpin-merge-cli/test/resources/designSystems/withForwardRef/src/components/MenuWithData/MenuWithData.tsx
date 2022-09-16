import * as React from 'react';

interface MenuItem {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export interface Props {
  data: MenuItem[];
}

const MenuWithData: any = React.forwardRef((props: Props) => {
  const { data } = props;
  return (
    <ul>
      {data.map(({ icon, title, subtitle }) => (
        <li>
          <span>
            {icon}
            {title}
          </span>
          <span>{subtitle}</span>
        </li>
      ))}
    </ul>
  );
});

export default MenuWithData;
