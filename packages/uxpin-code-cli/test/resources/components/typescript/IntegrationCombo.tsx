import * as React from 'react';

export interface Props {
  /**
   * Description for `value` property
   */
  value:string;
  /**
   * Description for optional `id` property
   */
  id?:number;
}

const PrivateComponent:React.StatelessComponent = (props) => {
  return <div>{props.children}</div>;
};

export default class IntegrationCombo extends React.Component<Props> {

  public render():JSX.Element {
    const { value, id } = this.props;
    return (
      <PrivateComponent>
        <button id={`Button${id}`}>
          {value}
        </button>
      </PrivateComponent>
    );
  }
}
