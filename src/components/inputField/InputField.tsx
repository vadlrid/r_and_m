import * as React from 'react';
import { useCallback } from 'react';
import { Close } from '@components/icons';
import { Size } from '@shared/types';
import { classNames } from '@shared/utils';
import './InputField.scss';

export interface InputFieldProps {
  className?: string;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  Prefix?: React.FC;
  size?: Size;
  hasBorder?: boolean;
  isInvalid?: boolean;
  onChange?(value: string): void;
  onTouch?(): void;
}

export const InputField = ({
  className: externalClassName,
  value,
  isDisabled,
  placeholder,
  Prefix,
  size = Size.LARGE,
  hasBorder,
  isInvalid,
  onChange,
  onTouch
}: InputFieldProps) => {
  const handleTouch = useCallback(() => {
    onTouch?.();
  }, [onTouch]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
      onTouch?.();
    },
    [onChange, onTouch]
  );

  const handleClear = useCallback(() => {
    onChange?.('');
    onTouch?.();
  }, [onChange, onTouch]);

  return (
    <div
      className={classNames(externalClassName, 'input-field', {
        'input-field_large': size === Size.LARGE,
        'input-field_bordered': hasBorder,
        'input-field_invalid': isInvalid
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
        disabled={isDisabled}
        value={value}
        onChange={handleChange}
        onBlur={handleTouch}
      />
      {!!value && (
        <button
          type='button'
          className='input-field__clear'
          disabled={isDisabled}
          onClick={handleClear}
          onBlur={handleTouch}
        >
          <Close />
        </button>
      )}
    </div>
  );
};
