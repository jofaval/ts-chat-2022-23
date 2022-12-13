type CommonDecoratorProps = {
  enabled?: boolean;
};

export type DecoratorFunction = <TProps = unknown>(
  props: CommonDecoratorProps & TProps
) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => unknown;
