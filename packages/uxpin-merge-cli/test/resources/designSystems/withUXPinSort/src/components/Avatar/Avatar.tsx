// tslint:disable:no-magic-numbers

import * as React from 'react';
import type { Test } from '../../test';

interface User {
  id: string;
  name: string;
  email: string;
}

type UserWithoutEmail = Omit<User, 'email'>;

export interface Props {
  imageUrl: string;
  test: Test;
  user: UserWithoutEmail;
  /** @uxpinsort desc  */
  appearance?: 'secondary' | 'link' | 'primary';
  /** @uxpinsort  */
  size?: 88 | 16 | 18 | 20 | 22 | 24 | 28 | 30 | 32 | 36 | 42 | 44 | 48 | 52 | 60 | 62 | 72;
  /** @uxpinsort asc  */
  type?: 'c' | 'a' | 'b';
}

export default class Avatar extends React.PureComponent<Props> {
  public static displayName = 'Gravatar';

  public static defaultProps: Partial<Props> = {
    test: { name: 'abc', abc: 1 } as Test,
  };

  public render(): JSX.Element {
    const { imageUrl, test, user } = this.props;
    return (
      <div>
        <img src={imageUrl} alt="Avatar" />
        {test.name} {test.abc} {user.id} {user.name}
      </div>
    );
  }
}
