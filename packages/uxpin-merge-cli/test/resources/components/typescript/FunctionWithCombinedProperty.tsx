import * as React from 'react';

interface Person {
  name: string;
}

interface Employee {
  salary: number;
}

export interface Props {
  /**
   * Local property
   */
  id: string;
  user: Person & Employee;
}

export default function FunctionWithCombinedProperty({ id, user }: Props) {
  return (
    <div>
      <label id={id}>{JSON.stringify(user)}</label>
    </div>
  );
}
