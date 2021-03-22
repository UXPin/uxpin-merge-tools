import * as React from 'react';
import type { Test } from '../../test';

interface User {
  id:string;
  name:string;
  email:string;
}

type UserWithoutEmail = Omit<User, 'email'>;

export interface Props {
  size:string;
  imageUrl:string;
  test:Test;
  user:UserWithoutEmail;
}

export default class Avatar extends React.PureComponent<Props> {

  public static displayName:string = 'Gravatar';

  public static defaultProps:Partial<Props> = {
    test: { name: 'abc', abc: 1 } as Test,
  };

  public render():JSX.Element {
    const { imageUrl, size, test, user } = this.props;
    return (
      <div className={size}>
        <img src={imageUrl} alt="Avatar"/>
        {test.name} {test.abc} {user.id} {user.name}
      </div>
    );
  }
}
