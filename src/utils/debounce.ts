export function debounce<T extends (...args: never[]) => void>(callback: T, wait = 120): T {
  let timeoutId = 0;

  return ((...args: Parameters<T>) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => callback(...args), wait);
  }) as T;
}
