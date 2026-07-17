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
  items?: KeyValue<T | null | undefined>[];
  placeholder?: string;
  selectedItem?: T;
  isInvalid?: boolean;
  OptionComponent?: React.FC<SelectOptionProps<T>>;
  hasEmptyOption?: boolean;
  onChange?(value?: T): void;
  onTouch?(): void;
}

export const Select = <T extends string | number>({
  className: externalClassName,
  size = Size.LARGE,
  items,
  placeholder,
  selectedItem,
  isInvalid,
  OptionComponent = DefaultSelectOption<T>,
  hasEmptyOption,
  onChange,
  onTouch
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectContainerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectContainerRef, () => setIsOpen(false));

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
    onTouch?.();
  }, [onTouch]);

  const handleSelect = useCallback(
    (item: KeyValue<T | null | undefined>) => {
      onChange?.(item.key ?? undefined);
      setIsOpen(false);
      onTouch?.();
    },
    [onChange, onTouch]
  );

  const clear = useCallback(() => {
    onChange?.(undefined);
    setIsOpen(false);
    onTouch?.();
  }, [onChange, onTouch]);

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
      data-testid='select-container'
      ref={selectContainerRef}
      className={classNames(externalClassName, 'select', {
        select_opened: isOpen,
        select_large: size === Size.LARGE,
        select_invalid: isInvalid
      })}
    >
      <div
        data-testid='selection'
        className='select__selection'
        onClick={toggleOpen}
      >
        {selectedOption ? (
          <OptionComponent data={selectedOption} />
        ) : (
          <div data-testid='test-placeholder'>{placeholder}</div>
        )}
        <Caret
          className={classNames('select__selection__caret', {
            select__selection__caret_down: !isOpen
          })}
        />
      </div>
      {isOpen && (
        <div className='select__options'>
          {hasEmptyOption && selectedOption && (
            <div className='select__option' onClick={clear}></div>
          )}
          {optionList}
        </div>
      )}
    </div>
  );
};
