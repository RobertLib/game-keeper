/**
 * @template TArgs
 * @template TReturn
 * @param {(...args: TArgs[]) => TReturn} func
 * @param {number} wait
 * @returns {(...args: TArgs[]) => void}
 */
export default function debounce(func, wait) {
  /** @type {NodeJS.Timeout?} */
  let timeoutId = null;

  return function (...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), wait);
  };
}
