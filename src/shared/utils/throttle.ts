export const throttle = <T extends (...args: Parameters<T>) => void>(
  callee: T,
  timeout: number
) => {
  let timerId: number | null = null;
  return function (...args: Parameters<T>) {
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
