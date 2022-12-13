import { DecoratorFunction } from "./types/common";

export const trace: DecoratorFunction<{ label?: string }> = ({
  label = "",
  enabled = true,
}) => {
  let log = console.log;
  if (!enabled) {
    log = () => {};
  }

  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, ...args);
      log(label, result);
      return result;
    };

    return descriptor;
  };
};

export const benchmark: DecoratorFunction<{ label?: string }> = ({
  label = "",
  enabled = true,
}) => {
  return function (target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (!enabled) {
        console.time(label);
      }

      const result = originalMethod.apply(this, ...args);

      if (!enabled) {
        console.timeEnd(label);
      }

      return result;
    };

    return descriptor;
  };
};
