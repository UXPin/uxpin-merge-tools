import * as React from 'react';

const noop:() => void = () => {
  return undefined;
};

export function FunctionWithBindAnnotation({ isChecked = false, onChange = noop, label, name = '' }:Props) {
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
  isChecked?:boolean;
  label:string;
  name?:string;
  onChange?:(event:React.ChangeEvent<HTMLInputElement>) => void;
}
