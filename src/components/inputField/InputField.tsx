import * as React from 'react';
import { useCallback } from 'react';
import { Close } from '@components/icons';
import { Size } from '@shared/types';
import { classNames } from '@shared/utils';
import './InputField.scss';

interface InputFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
  Prefix?: React.FC;
  size?: Size;
  hasBorder?: boolean;
}

export const InputField = ({
  value,
  onChange,
  isDisabled,
  placeholder,
  Prefix,
  size = Size.LARGE,
  hasBorder
}: InputFieldProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange?.(event.target.value),
    [onChange]
  );
  const handleClear = useCallback(() => onChange?.(''), [onChange]);

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
        onChange={handleChange}
        disabled={isDisabled}
      />
      {!!value && (
        <button
          type='button'
          className='input-field__clear'
          disabled={isDisabled}
          onClick={handleClear}
        >
          <Close />
        </button>
      )}
    </div>
  );
};
