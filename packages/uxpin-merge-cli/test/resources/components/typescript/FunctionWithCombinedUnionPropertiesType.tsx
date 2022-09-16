import * as React from 'react';
import { I18nProps } from './hoc/withI18n';

interface BaseProps {
  /**
   * Local property
   */
  id: string;
  disabled?: boolean;
}

type Props = BaseProps & ({ disabled: boolean } | { readOnly: true } | { onChange(value: any): void });

type CombinedProps = Props & I18nProps;

export default function FunctionWithCombinedUnionPropertiesType({ i18n, id }: CombinedProps) {
  return (
    <div>
      <label id={id}>{i18n}</label>
    </div>
  );
}
