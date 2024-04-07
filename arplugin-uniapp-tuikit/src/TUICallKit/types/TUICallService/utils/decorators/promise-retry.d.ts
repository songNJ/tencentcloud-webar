/**
 * 异步函数重试 Interface
 * @param {number} [retries = 5] 重试次数
 * @param {number} [timeout = 2000] 重试间隔时间
 * @param {Function=} onError 重试错误回调
 * @param {Function=} onRetrying 重试回调
 * @param {Function=} onRetryFailed 重试失败回调
 */
interface IPromiseRetryDecoratorSettings {
    retries?: number;
    timeout?: number;
    onError?: Function;
    onRetrying?: Function;
    onRetryFailed?: Function;
}
/**
 * 装饰器函数：给异步函数增加重试
 * @param {Object} settings 入参
 * @returns {Function}
 * @example
 * class LocalStream {
 *   @promiseRetryDecorator({
 *     retries: 10,
 *     timeout: 3000,
 *     onRetryFailed: function(error) {
 *     }
 *   })
 *   async recoverCapture(options) {}
 * }
 */
export default function promiseRetryDecorator(settings: IPromiseRetryDecoratorSettings): (target: any, name: any, descriptor: any) => any;
export {};
