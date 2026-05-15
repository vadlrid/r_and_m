import classNames from 'classnames';
import { Size } from '@shared/types';
import './Indicator.css';

interface IIndicatorProps {
  size?: Size;
  title?: string;
}

export const Indicator = ({ size, title }: IIndicatorProps) => {
  size = size ?? Size.LARGE;
  return (
    <>
      <div
        className={classNames('indicator', {
          indicator_large: size === Size.LARGE
        })}
      >
        <div className='indicator__portal'></div>
        {!!title && <h3 className='indicator__title'>{title}</h3>}
      </div>
    </>
  );
};
