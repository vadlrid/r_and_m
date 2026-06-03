type CallbackFn = (...args: unknown[]) => void;
export const throttle = (callee: CallbackFn, timeout: number): CallbackFn => {
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
