/**
 * 装饰器：阻止函数重复调用
 * @export
 * @param {Object} options 入参
 * @param {Function} options.fn 函数
 * @param {Object} options.context 上下文对象
 * @param {String} options.name 函数名
 * @returns {Function} 封装后的函数
 */
export declare function avoidRepeatedCall(): (target: any, name: string, descriptor: any) => any;
