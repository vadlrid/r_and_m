import { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ALL_GENDER_VALUES,
  ALL_SPECIES_VALUES,
  ALL_STATUS_VALUES,
  type Character,
  Gender,
  Species,
  Status
} from '@shared/domain';

export type CharacterForm = ReturnType<typeof useCharacterForm>;

const characterFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  status: Yup.mixed<Status>().oneOf(ALL_STATUS_VALUES),
  species: Yup.mixed<Species>().oneOf(ALL_SPECIES_VALUES),
  gender: Yup.mixed<Gender>().oneOf(ALL_GENDER_VALUES),
  location: Yup.string().required('Location is required')
});

type CharacterFormValues = Yup.InferType<typeof characterFormValidationSchema>;

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
    validationSchema: characterFormValidationSchema,
    onSubmit
  });
};
