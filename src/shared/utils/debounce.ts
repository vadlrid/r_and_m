export const debounce = <T extends (...args: Parameters<T>) => void>(
  callee: T,
  timeout: number
) => {
  let timerId: number | null = null;
  return (...args: Parameters<T>): void => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => callee(...args), timeout);
  };
};
