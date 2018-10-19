import * as React from 'react';

export interface Props {
  size:string;
  imageUrl:string;
}

export default class Avatar extends React.PureComponent<Props> {

  public render():JSX.Element {
    const { imageUrl, size } = this.props;
    return (
      <div className={size}>
        <img src={imageUrl} alt="Avatar"/>
      </div>
    );
  }
}
