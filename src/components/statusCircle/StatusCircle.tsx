import { Status } from '@shared/domain';
import { classNames } from '@shared/utils';
import './StatusCircle.scss';

const STATUS_COLORS: Record<Status, string> = {
  [Status.ALIVE]: 'green',
  [Status.DEAD]: 'red',
  [Status.UNKNOWN]: 'orange'
};

interface StatusCircleProps {
  status: Status;
}

export const StatusCircle = ({ status }: StatusCircleProps) => {
  const color = `status-circle_${STATUS_COLORS[status]}`;
  return <div className={classNames('status-circle', color)}></div>;
};
