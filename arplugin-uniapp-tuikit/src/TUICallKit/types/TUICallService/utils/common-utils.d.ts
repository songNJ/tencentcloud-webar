export declare const isUndefined: (input: any) => boolean;
export declare const isPlainObject: (input: any) => boolean;
export declare const isArray: (input: any) => boolean;
export declare const isPrivateKey: (key: string) => boolean;
export declare const isUrl: (url: string) => boolean;
/**
 * 检测input类型是否为string
 * @param {*} input 任意类型的输入
 * @returns {Boolean} true->string / false->not a string
 */
export declare const isString: (input: any) => boolean;
export declare const isBoolean: (input: any) => boolean;
export declare const isNumber: (input: any) => boolean;
export declare function formatTime(secondTime: number): string;
export declare function formatTimeInverse(stringTime: string): number;
export declare function isJSON(str: string): boolean;
export declare const JSONToObject: (str: string) => any;
/**
 * 重试函数, catch 时，重试
 * @param {Promise} promise 需重试的函数
 * @param {number} num 需要重试的次数
 * @param {number} time 间隔时间（s）
 * @returns {Promise<any>} im 接口的 response 原样返回
 */
export declare const retryPromise: (promise: Promise<any>, num?: number, time?: number) => Promise<any>;
/**
 * web call engine 重复调用时的错误, 这种错误在 TUICallKit 应该忽略
 * @param {any} error 错误信息
 * @returns {Boolean}
 */
export declare function handleRepeatedCallError(error: any): boolean;
/**
 * 设备无权限时的错误处理
 * @param {any} error 错误信息
 * @returns {Boolean}
 */
export declare function handleNoDevicePermissionError(error: any): boolean;
export declare function performanceNow(): number;
/**
 * 检测input类型是否为function
 * @param {*} input 任意类型的输入
 * @returns {Boolean} true->input is a function
 */
export declare const isFunction: (input: any) => boolean;
export declare const getLanguage: () => string;
export declare function noop(e: any): void;
/**
 * Get the object type string
 * @param {*} input 任意类型的输入
 * @returns {String} the object type string
 */
export declare const getType: (input: any) => any;
export declare function modifyObjectKey(obj: any, oldKey: any, newKey: any): any;
