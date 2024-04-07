/// <reference types="node" />
/**
 * 定时器，功能：
 * 1. 支持定时执行回调 [1,n] 次，用于常规延迟、定时操作
 * @example
 * // 默认嵌套执行，count=0 无限次
 * timer.run(callback, {delay: 2000});
 * // count=1 等同于 原始setTimeout
 * timer.run(callback, {delay: 2000, count:0});
 * 2. 支持 RAF 执行回调，用于小流渲染，audio音量获取等任务，需要渲染频率稳定，支持页面退后台后，用 setTimeout 接管，最短 1s 执行一次
 * @example
 * // 默认60fps，可以根据单位时长换算，默认开启后台执行
 * timer.run('raf', callback, {fps: 60});
 * // 设置执行次数
 * timer.run('raf', callback, {fps: 60, count: 300, backgroundTask: false});
 * 3. 支持空闲任务执行回调, requestIdleCallback 在帧渲染的空闲时间执行任务，可以用于 storage 写入等低优先级的任务
 * @example
 * // 支持原生setInterval 但不推荐使用，定时任务推荐用 timeout
 * timer.run('interval', callback, {delay:2000, count:10})
 */
declare class Timer {
    static taskMap: Map<any, any>;
    static currentTaskID: number;
    static generateTaskID(): number;
    /**
     *
     * @param {string} taskName 'interval' 'timeout'
     * @param {function} callback
     * @param {object} options include:
     * @param {number} options.delay millisecond
     * @param {number} options.count 定时器回调执行次数，0 无限次 or n次
     * @param {boolean} options.backgroundTask 在页面静默后是否继续执行定时器
     */
    static run(taskName: any, callback: any, options: any): any;
    /**
     * 定时循环执行回调函数
     * 可以指定循环的时间间隔
     * 可以指定循环次数
     * @param {object} taskItem
     * @param {function} callback
     * @param {*} delay
     * @param {*} count
     * @returns ID
     */
    static interval(taskItem: any): NodeJS.Timer;
    /**
     * 延迟执行回调
     * count = 0,循环
     * count = n, 执行n次
     * @param {object} taskItem
     *
     */
    static timeout(taskItem: any): NodeJS.Timeout;
    static hasTask(taskID: any): boolean;
    static clearTask(taskID: any): boolean;
    /**
     * 1. 如果已移除出定时队列，退出当前任务
     * 2. 如果当前任务已满足次数限制，则退出当前任务
     * @param {object} taskItem
     * @returns
     */
    static isBreakLoop(taskItem: any): boolean;
}
export default Timer;
