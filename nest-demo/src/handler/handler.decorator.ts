import { SetMetadata } from '@nestjs/common';

export const Handler = (...args: number[]) => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 设置方法元数据
    Reflect.defineMetadata('HandlerMeta', args, target, propertyKey);

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`${args} Before method execution`);
      const result = originalMethod.apply(this, args);
      console.log(`${args} After method execution`);
      return result;
    };
    return descriptor;
  };
}