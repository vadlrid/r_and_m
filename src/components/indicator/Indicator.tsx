import './Indicator.css';
import { IndicatorSize } from './indicator-size.enum.ts';
import classNames from 'classnames';

interface IIndicatorProps {
  size?: IndicatorSize;
  title?: string;
}

export const Indicator = ({ size, title }: IIndicatorProps) => {
  size = size ?? IndicatorSize.LARGE;
  return (
    <>
      <div
        className={classNames('indicator', {
          'is-large': size === IndicatorSize.LARGE
        })}
      >
        <div className='portal'></div>
        {!!title && <h3>{title}</h3>}
      </div>
    </>
  );
};
