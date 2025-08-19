export const timeoutCallback = (callback: () => void, timeout: number) => {
  const timer = setTimeout(() => {
    callback();
    clearTimeout(timer);
  }, timeout);
};
