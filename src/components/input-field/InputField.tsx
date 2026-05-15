import * as React from 'react';
import { Close } from '@components/icons';
import { Size } from '@shared/types';
import { classNames } from '@shared/utils';
import './InputField.css';

interface InputFieldProps {
  value?: string;
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  prefixComponent?: React.FC;
  size?: Size;
  hasBorder?: boolean;
}

export const InputField = ({
  value,
  onValueChange,
  isDisabled,
  placeholder,
  prefixComponent,
  size,
  hasBorder
}: InputFieldProps) => {
  const Prefix = prefixComponent;
  size = size ?? Size.LARGE;

  return (
    <div
      className={classNames('input-field', {
        'input-field_large': size === Size.LARGE,
        'input-field_bordered': hasBorder
      })}
    >
      {!!Prefix && (
        <div className='input-field__prefix'>
          <Prefix />
        </div>
      )}
      <input
        type='text'
        className='input-field__value'
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        disabled={isDisabled}
      />
      {!!value && (
        <button
          type='button'
          className='input-field__clear'
          disabled={isDisabled}
          onClick={() => onValueChange?.('')}
        >
          <Close />
        </button>
      )}
    </div>
  );
};
