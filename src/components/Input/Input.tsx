import React from 'react';
import './Input.css';

function Input(props: {
  id: string;
  label: string;
  name: string;
  onChange?: Function;
  value?: string;
  type?: string;
  disabled?: boolean;
  min?: string;
  onKeyPress?: any;
}) {
  const { id, label, name, onChange, value, type, disabled, min, onKeyPress } = props;
  console.log(id, label, name, value);

  return (
    <fieldset className="input p-2">
      <legend className={disabled ? 'text-muted w-auto' : 'w-auto'}>{label}</legend>
      {value ? (
        <input
          id={id}
          type={type || 'text'}
          disabled={disabled}
          min={min}
          onKeyPress={onKeyPress}
          value={value}
          required
          onChange={e => {
            if (onChange) onChange(e);
          }}
        />
      ) : (
        <input
          id={id}
          type={type || 'text'}
          disabled={disabled}
          min={min}
          onKeyPress={onKeyPress}
          required
          onChange={e => {
            if (onChange) onChange(e);
          }}
        />
      )}
    </fieldset>
  );
}

export default Input;
