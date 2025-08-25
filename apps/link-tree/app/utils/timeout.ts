/** Clears the timeout when timeout is reached or the component is unmounted */
export const timeoutCallback = (callback: () => void, timeout: number) => {
  const timer = setTimeout(() => {
    callback();
    clearTimeout(timer);
  }, timeout);
  return () => timer && clearTimeout(timer);
};
