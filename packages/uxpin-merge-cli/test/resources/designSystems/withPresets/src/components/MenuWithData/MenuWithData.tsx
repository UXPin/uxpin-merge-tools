import * as React from 'react';

interface MenuItem {
  title:string;
  subtitle:string;
}

export interface Props {
  data:MenuItem[];
}

export default class MenuWithData extends React.PureComponent<Props> {

  public render():JSX.Element {
    const { data } = this.props;
    return (
      <ul>
        {data.map(({ title, subtitle }) => (
          <li><span>{title}</span><span>{subtitle}</span></li>
        ))}
      </ul>
    );
  }
}
