interface CharacterInfoFieldProps<T extends string> {
  label: string;
  value: T;
}

export const CharacterInfoField = <T extends string>({
  label,
  value
}: CharacterInfoFieldProps<T>) => (
  <div className='field'>
    <label className='field__label'>{label}</label>
    <span className='field__value'>{value}</span>
    <span className='field__separator'></span>
  </div>
);
