import { useCallback } from 'react';
import { type FormikErrors, useFormik } from 'formik';
import { type Character, Gender, Species, Status } from '@shared/domain';

type CharacterFormValues = Partial<
  Pick<Character, 'name' | 'status' | 'species' | 'gender' | 'location'>
>;

export type CharacterForm = ReturnType<typeof useCharacterForm>;

export const useCharacterForm = (
  data: Character,
  handleSubmit?: (updatedCharacter: Character) => void
) => {
  const onSubmit = useCallback(
    (values: CharacterFormValues) => {
      if (!handleSubmit) {
        return;
      }
      const updatedCharacter: Character = {
        ...data,
        ...values
      };

      handleSubmit(updatedCharacter);
    },
    [handleSubmit, data]
  );

  return useFormik<CharacterFormValues>({
    initialValues: {
      name: data?.name ?? '',
      status: data?.status ?? Status.UNKNOWN,
      species: data?.species ?? Species.UNKNOWN,
      gender: data?.gender ?? Gender.UNKNOWN,
      location: data?.location ?? ''
    },
    validate: (values) => {
      const errors: FormikErrors<CharacterFormValues> = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.location) {
        errors.location = 'Location is required';
      }
      return errors;
    },
    onSubmit
  });
};
