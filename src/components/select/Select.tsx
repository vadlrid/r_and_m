import { useCallback, useMemo, useRef, useState } from 'react';
import { Caret } from '@components/icons';
import { useOutsideClick } from '@shared/hooks';
import { type KeyValue, Size } from '@shared/types';
import { classNames } from '@shared/utils';
import {
  DefaultSelectOption,
  type SelectOptionProps
} from './SelectOption.tsx';
import './Select.scss';

export interface SelectProps<T extends string | number> {
  className?: string;
  size?: Size;
  items?: KeyValue<T>[];
  placeholder?: string;
  selectedItem?: T;
  onChange?: (value: T) => void;
  onTouch?: () => void;
  isInvalid?: boolean;
  OptionComponent?: React.FC<SelectOptionProps<T>>;
}

export const Select = <T extends string | number>({
  className: externalClassName,
  size = Size.LARGE,
  items,
  placeholder,
  selectedItem,
  onChange,
  onTouch,
  isInvalid,
  OptionComponent = DefaultSelectOption<T>
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectContainerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectContainerRef, () => setIsOpen(false));

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
    onTouch?.();
  }, [onTouch]);

  const handleSelect = useCallback(
    (item: KeyValue<T>) => {
      onChange?.(item.key);
      setIsOpen(false);
      onTouch?.();
    },
    [onChange, onTouch]
  );

  const optionList = useMemo(() => {
    return (items ?? []).map((item) => (
      <div
        key={item.key}
        className={classNames('select__option', {
          select__option_selected: item.key === selectedItem
        })}
        onClick={() => handleSelect(item)}
      >
        <OptionComponent data={item} />
      </div>
    ));
  }, [items, selectedItem, OptionComponent, handleSelect]);

  const selectedOption = useMemo(() => {
    return items?.find((item) => item.key === selectedItem);
  }, [items, selectedItem]);

  return (
    <div
      ref={selectContainerRef}
      className={classNames(externalClassName, 'select', {
        select_opened: isOpen,
        select_large: size === Size.LARGE,
        select_invalid: isInvalid
      })}
    >
      <div className='select__selection' onClick={toggleOpen}>
        {selectedOption ? (
          <OptionComponent data={selectedOption} />
        ) : (
          <div>{placeholder}</div>
        )}
        <Caret
          className={classNames('select__selection__caret', {
            select__selection__caret_down: !isOpen
          })}
        />
      </div>
      {isOpen && <div className='select__options'>{optionList}</div>}
    </div>
  );
};
