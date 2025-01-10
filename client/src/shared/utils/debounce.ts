// T extends (...args: any[]) => void: This generic constraint ensures that T is a function
//        that takes any number of arguments
// and returns nothing (indicated by void).
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  // Parameters<T>: built-in TypeScript utility type to extract the parameter types of the function represented by T

  let timeout: NodeJS.Timeout; //  to store the timeout reference.

  //  The function to be debounced (func)
  // is passed along with the arguments (...args)
  // after the specified delay.
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout); // to clear existing timeout
    timeout = setTimeout(() => func(...args), delay);
  };
};
