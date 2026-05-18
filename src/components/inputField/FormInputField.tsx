import { useField } from 'formik';
import type { FormFieldProps } from '@shared/types';
import { InputField, type InputFieldProps } from './InputField.tsx';

interface FormInputFieldProps
  extends
    FormFieldProps,
    Omit<InputFieldProps, 'value' | 'onChange' | 'isInvalid' | 'onTouch'> {}

export const FormInputField = ({
  formFieldName,
  ...props
}: FormInputFieldProps) => {
  const [field, meta, helper] = useField(formFieldName);

  return (
    <InputField
      {...props}
      value={field.value}
      isInvalid={!!meta.error && meta.touched}
      onChange={(value) => helper.setValue(value)}
      onTouch={() => helper.setTouched(true, false)}
    />
  );
};
