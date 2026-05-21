import { Size } from '@shared/types';
import { classNames } from '@shared/utils';
import './Indicator.scss';

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
