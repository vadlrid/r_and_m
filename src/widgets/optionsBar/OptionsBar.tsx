import { LanguageSwitcher } from './LanguageSwitcher';
import './OptionsBar.scss';
import { ThemeSwitcher } from './ThemeSwitcher';

export const OptionsBar = () => {
  return (
    <div className='options-bar'>
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  );
};
