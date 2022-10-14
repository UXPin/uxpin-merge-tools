import * as React from 'react';

interface MenuItem {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}

export interface Props {
  data: MenuItem[];
}

class MenuWithData extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { data } = this.props;
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
  }
}

export default MenuWithData;
