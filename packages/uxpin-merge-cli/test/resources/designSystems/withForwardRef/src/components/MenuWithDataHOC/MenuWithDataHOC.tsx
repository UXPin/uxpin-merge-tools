import * as React from 'react';

interface MenuItem {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export interface Props {
  data: MenuItem[];
}

function HOC(component: any): any {
  return component;
}

const MenuWithDataHOC: React.FC<Props> = React.forwardRef((props) => {
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

export default HOC(MenuWithDataHOC);
