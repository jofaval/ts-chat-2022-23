type FactorialFunc = (n:number) => number

/**
 * Memoizes the given value
 */
const memoize = () => {
    const cache = new Map<number, number>()

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;

      descriptor.value = function (number) {
        if (cache.has(number)) {
          return cache.get(number)
        }

        return originalMethod.apply(this, number);
      } as FactorialFunc;
    
      return descriptor;
    }
};

@memoize
export const factorial:FactorialFunc = (n) => {
  if (n <= 1) {
    return 1;
  }

  return factorial(n - 1) * n;
};
