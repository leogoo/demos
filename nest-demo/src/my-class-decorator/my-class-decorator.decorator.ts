export const MyClassDecorator = (str: string) => {
  return function (target: Function) {
    console.log(str, target);
    // 修改控制器类的行为，添加自定义逻辑
    // 可以在这里修改类的原型、添加新的方法等
    // 也可以添加自定义的元数据
    Reflect.defineMetadata('meta-b', str, target);
  }
}
