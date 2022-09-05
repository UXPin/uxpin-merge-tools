import * as React from 'react';

export interface Props {
  // tslint:disable-next-line
  size?: string;
  imageUrl: string;
}

export default class Avatar extends React.PureComponent<Props> {
  public static displayName = 'Gravatar';

  public render(): JSX.Element {
    const { imageUrl, size } = this.props;
    return (
      <div className={size}>
        <img src={imageUrl} alt="Avatar" />
      </div>
    );
  }
}
