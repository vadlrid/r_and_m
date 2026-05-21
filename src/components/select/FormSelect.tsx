import { useField } from 'formik';
import type { FormFieldProps } from '@shared/types';
import { Select, type SelectProps } from './Select.tsx';

interface FormSelectProps<T extends string | number>
  extends
    FormFieldProps,
    Omit<
      SelectProps<T>,
      'selectedItem' | 'onChange' | 'onTouch' | 'isInvalid'
    > {}

export const FormSelect = <T extends string | number>({
  formFieldName,
  ...props
}: FormSelectProps<T>) => {
  const [field, meta, helper] = useField(formFieldName);

  return (
    <Select
      {...props}
      selectedItem={field.value}
      isInvalid={!!meta.error && meta.touched}
      onChange={(value) => helper.setValue(value)}
      onTouch={() => helper.setTouched(true, false)}
    />
  );
};
