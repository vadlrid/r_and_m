import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { CaretDown, CaretUp } from '@components/icons';
import { type KeyValue, Size } from '@shared/types';
import {
  DefaultSelectOption,
  type ISelectOptionProps
} from './SelectOption.tsx';
import './Select.css';

interface ISelectProps<T extends string | number> {
  size?: Size;
  items?: KeyValue<T>[];
  placeholder?: string;
  selectedItem?: T;
  selectedItemChange?: (value: T) => void;
  optionComponent?: React.FC<ISelectOptionProps<T>>;
}

export const Select = <T extends string | number>({
  size: sizeParam,
  items,
  placeholder,
  selectedItem,
  selectedItemChange,
  optionComponent: optionComponentParam
}: ISelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const size = useMemo(() => sizeParam ?? Size.LARGE, [sizeParam]);
  const OptionComponent = useMemo(
    () => optionComponentParam ?? DefaultSelectOption<T>,
    [optionComponentParam]
  );

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = useCallback(
    (item: KeyValue<T>) => {
      selectedItemChange?.(item.key);
      setIsOpen(false);
    },
    [setIsOpen, selectedItemChange]
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
        {isOpen ? (
          <CaretUp className='select__selection__caret' />
        ) : (
          <CaretDown className='select__selection__caret' />
        )}
      </div>
      {isOpen && <div className='select__options'>{optionList}</div>}
    </div>
  );
};
