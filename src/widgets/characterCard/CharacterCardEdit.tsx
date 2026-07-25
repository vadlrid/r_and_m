import { FormikProvider } from 'formik';
import { FormInputField } from '@components/inputField';
import { FormSelect, type SelectOptionProps } from '@components/select';
import { StatusCircle } from '@components/statusCircle';
import { Status } from '@shared/domain';
import {
  useCharacterLabels,
  useListGender,
  useListSpecies,
  useListStatus
} from '@shared/hooks';
import { Size } from '@shared/types';
import type { CharacterForm } from './CharacterForm';

const StatusOption = ({ data }: SelectOptionProps<Status>) => {
  return (
    <div className='field-group__status'>
      {data.value}
      {!!data.key && <StatusCircle status={data.key} />}
    </div>
  );
};

interface CharacterCardEditProps {
  form: CharacterForm;
}

export const CharacterCardEdit = ({ form }: CharacterCardEditProps) => {
  const { lblGender, lblSpecies, lblLocation, lblStatus } =
    useCharacterLabels();

  const listGender = useListGender();
  const listSpecies = useListSpecies();
  const listStatus = useListStatus();

  return (
    <FormikProvider value={form}>
      <FormInputField className='character-card__title' formFieldName='name' />
      <div className='field-group'>
        <label>{lblGender}</label>
        <FormSelect
          className='field-group__form-control'
          size={Size.SMALL}
          formFieldName='gender'
          items={listGender}
        />
      </div>
      <div className='field-group'>
        <label>{lblSpecies}</label>
        <FormSelect
          className='field-group__form-control'
          size={Size.SMALL}
          formFieldName='species'
          items={listSpecies}
        />
      </div>
      <div className='field-group'>
        <label>{lblLocation}</label>
        <FormInputField
          className='field-group__form-control'
          size={Size.SMALL}
          formFieldName='location'
        />
      </div>
      <div className='field-group'>
        <label>{lblStatus}</label>
        <FormSelect
          className='field-group__form-control'
          size={Size.SMALL}
          formFieldName='status'
          items={listStatus}
          OptionComponent={StatusOption}
        />
      </div>
    </FormikProvider>
  );
};
