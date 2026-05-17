import { useCallback, useMemo, useRef, useState } from 'react';
import { Caret } from '@components/icons';
import { useOutsideClick } from '@shared/hooks';
import { type KeyValue, Size } from '@shared/types';
import { classNames } from '@shared/utils';
import {
  DefaultSelectOption,
  type ISelectOptionProps
} from './SelectOption.tsx';
import './Select.scss';

interface ISelectProps<T extends string | number> {
  size?: Size;
  items?: KeyValue<T>[];
  placeholder?: string;
  selectedItem?: T;
  onChange?: (value: T) => void;
  OptionComponent?: React.FC<ISelectOptionProps<T>>;
}

export const Select = <T extends string | number>({
  size = Size.LARGE,
  items,
  placeholder,
  selectedItem,
  onChange,
  OptionComponent = DefaultSelectOption<T>
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectContainerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(selectContainerRef, () => setIsOpen(false));

  const toggleOpen = () => setIsOpen((value) => !value);

  const handleSelect = useCallback(
    (item: KeyValue<T>) => {
      onChange?.(item.key);
      setIsOpen(false);
    },
    [setIsOpen, onChange]
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
      className={classNames(
        'select',
        { select_opened: isOpen },
        { select_large: size === Size.LARGE }
      )}
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
