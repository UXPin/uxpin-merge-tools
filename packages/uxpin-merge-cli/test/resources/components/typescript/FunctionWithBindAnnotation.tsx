import * as React from 'react';

const noop:() => void = () => {
  return undefined;
};

export function FunctionWithBindAnnotation(props:Props) {

  const { isChecked = false, onChange = noop, label, name = '' } = props;
  return (
    <label>
      {label}
      <input type="checkbox" name={name} onChange={onChange} checked={isChecked} />
    </label>
  );
}

interface Props {
  /**
   * @uxpinbind onChange 0.target.checked
   */
  isChecked:boolean;
  label:string;
  name?:string;
  onChange:(event:React.ChangeEvent<HTMLInputElement>) => void;
}
