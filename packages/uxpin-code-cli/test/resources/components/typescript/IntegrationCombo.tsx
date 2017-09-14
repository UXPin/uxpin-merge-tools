import * as React from 'react';

export interface Props {
  value:string;
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
