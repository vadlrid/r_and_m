import { type PropsWithChildren, useEffect, useRef } from 'react';
import { classNames } from '@shared/utils';

type CallbackFn = (...args: unknown[]) => void;
const throttle = (callee: CallbackFn, timeout: number): CallbackFn => {
  let timerId: number | null = null;
  return function (...args: unknown[]) {
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      callee(...args);
      clearTimeout(timerId!);
      timerId = null;
    }, timeout);
  };
};

interface ScrollContainerProps {
  className?: string;
  scrollTop?: number;
  onScrollTopChanged?(value: number): void;
  onBottomReached?(): void;
}

export const ScrollContainer = ({
  className: externalClassName,
  scrollTop = 0,
  onScrollTopChanged = () => {},
  onBottomReached = () => {},
  children
}: PropsWithChildren<ScrollContainerProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const checkPosition = throttle(() => {
      const threshold = container.scrollHeight - container.clientHeight / 4;
      const position = container.scrollTop + container.clientHeight;
      if (position >= threshold) {
        onBottomReached();
      }
      onScrollTopChanged(container.scrollTop);
    }, 250);

    container.addEventListener('scroll', checkPosition);
    container.addEventListener('resize', checkPosition);
    return () => {
      container.removeEventListener('scroll', checkPosition);
      container.removeEventListener('resize', checkPosition);
    };
  }, [onBottomReached, onScrollTopChanged]);

  useEffect(() => {
    const container = containerRef?.current;
    if (scrollTop === container?.scrollTop) {
      return;
    }
    container?.scrollTo({
      top: scrollTop,
      behavior: 'instant'
    });
  }, [scrollTop]);

  return (
    <div
      ref={containerRef}
      className={classNames(externalClassName, 'scroll-container')}
    >
      {children}
    </div>
  );
};
