/**
 * Memoizes the given value so that it doesn't get computed twice
 */
export const memoize = () => {
  const cache = new Map<any, any>();

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (cache.has(args)) {
        return cache.get(args);
      }

      return originalMethod.apply(this, ...args);
    };

    return descriptor;
  };
};
