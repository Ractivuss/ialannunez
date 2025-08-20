export const timeoutCallback = (callback: () => void, timeout: number) => {
  const timeoutId = setTimeout(() => {
    callback();
    clearTimeout(timeoutId);
  }, timeout);
};
