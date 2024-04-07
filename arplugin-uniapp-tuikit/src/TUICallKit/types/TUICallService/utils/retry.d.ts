/**
 * 给异步函数封装重试逻辑
 * @param {Object} options 重试逻辑入参
 * @param {Object} options.retryFunction 需要封装的异步函数
 * @param {Object} options.settings 重试属性
 * @param {Number} [options.settings.retries = 5] 重试次数
 * @param {Number} [options.settings.timeout = 1000] 重试间隔
 * @param {onErrorCallback} options.onError 重试错误回调
 * @param {onRetryingCallback} [options.onRetrying] 重试后的回调
 * @param {Object} options.context 上下文，可选
 * @returns {Function} 封装后的函数
 * @example
 * const getUserMedia = promiseRetry({
 *   retryFunction: getUserMedia_,
 *   settings: { retries: 5, timeout: 2000 },
 *   onError: (error, retry, reject) => {
 *     if (error.name === 'NotReadableError') {
 *       retry();
 *     } else {
 *       reject(error);
 *     }
 *   },
 *   onRetrying: retryCount => {
 *     console.warn(`getUserMedia NotReadableError observed, retrying [${retryCount}/5]`);
 *   }
 * });
 */
declare function promiseRetry({ retryFunction, settings, onError, onRetrying, onRetryFailed, context }: {
    retryFunction: any;
    settings: any;
    onError: any;
    onRetrying: any;
    onRetryFailed: any;
    context: any;
}): (...args: any[]) => Promise<unknown>;
export default promiseRetry;
