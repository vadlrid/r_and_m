import { FormikProvider } from 'formik';
import { FormInputField } from '@components/inputField';
import { FormSelect, type SelectOptionProps } from '@components/select';
import { StatusCircle } from '@components/statusCircle';
import type { CharacterForm } from '@widgets/characterCard/CharacterForm.ts';
import { LIST_GENDER, LIST_SPECIES, LIST_STATUS, Status } from '@shared/domain';
import { Size } from '@shared/types';

const StatusOption = ({ data }: SelectOptionProps<Status>) => {
  return (
    <div className='character-card__content__status'>
      {data.value}
      <StatusCircle status={data.key} />
    </div>
  );
};

interface CharacterCardEditProps {
  form: CharacterForm;
}

export const CharacterCardEdit = ({ form }: CharacterCardEditProps) => {
  return (
    <FormikProvider value={form}>
      <FormInputField
        className='character-card__content__title'
        formFieldName='name'
      />
      <div className='character-card__content__field-group'>
        <label>Gender</label>
        <FormSelect
          className='character-card__form-control'
          size={Size.SMALL}
          formFieldName='gender'
          items={LIST_GENDER}
        />
      </div>
      <div className='character-card__content__field-group'>
        <label>Species</label>
        <FormSelect
          className='character-card__form-control'
          size={Size.SMALL}
          formFieldName='species'
          items={LIST_SPECIES}
        />
      </div>
      <div className='character-card__content__field-group'>
        <label>Location</label>
        <FormInputField
          className='character-card__form-control'
          size={Size.SMALL}
          formFieldName='location'
        />
      </div>
      <div className='character-card__content__field-group'>
        <label>Status</label>
        <FormSelect
          className='character-card__form-control'
          size={Size.SMALL}
          formFieldName='status'
          items={LIST_STATUS}
          OptionComponent={StatusOption}
        />
      </div>
    </FormikProvider>
  );
};
