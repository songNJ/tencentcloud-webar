import { NAME } from '../../const/index';

/**
 * 装饰器：阻止函数重复调用
 * @export
 * @param {Object} options 入参
 * @param {Function} options.fn 函数
 * @param {Object} options.context 上下文对象
 * @param {String} options.name 函数名
 * @returns {Function} 封装后的函数
 */
export function avoidRepeatedCall() {
  return function (target: any, name: string, descriptor: any) {
    const oldFn = descriptor.value;
    const isCallingSet = new Set();
    descriptor.value = async function (...args: any[]) {
      if (isCallingSet.has(this)) {
        console.warn((`${NAME.PREFIX}previous ${name}() is ongoing, please avoid repeated calls`));
        // throw new Error(`previous ${name}() is ongoing, please avoid repeated calls`);
        return;
      }
      try {
        isCallingSet.add(this);
        const result = await oldFn.apply(this, args);
        isCallingSet.delete(this);
        return result;
      } catch (error) {
        isCallingSet.delete(this);
        throw error;
      }
    };
    return descriptor;
  };
}
