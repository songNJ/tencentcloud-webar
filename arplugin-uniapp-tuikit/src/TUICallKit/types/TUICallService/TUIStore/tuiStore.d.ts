import { ITUIStore, IOptions, Task } from '../interface/ITUIStore';
import { StoreName } from '../const/index';
export default class TUIStore implements ITUIStore {
    static instance: TUIStore;
    task: Task;
    private storeMap;
    private timerId;
    constructor();
    /**
     * 获取 TUIStore 实例
     * @returns {TUIStore}
    */
    static getInstance(): TUIStore;
    /**
     * UI 组件注册监听回调
     * @param {StoreName} storeName store 名称
     * @param {IOptions} options 监听信息
     * @param {Object} params 扩展参数
     * @param {String} params.notifyRangeWhenWatch 注册时监听时的通知范围, 'all' - 通知所有注册该 key 的监听; 'myself' - 通知本次注册该 key 的监听; 默认不通知
    */
    watch(storeName: StoreName, options: IOptions, params?: any): void;
    /**
     * UI 取消组件监听回调
     * @param {StoreName} storeName store 名称
     * @param {IOptions} options 监听信息,包含需要取消的回掉等
     */
    unwatch(storeName: StoreName, options: IOptions): void;
    /**
     * 通用 store 数据更新，messageList 的变更需要单独处理
     * @param {StoreName} storeName store 名称
     * @param {string} key 变更的 key
     * @param {unknown} data 变更的数据
    */
    update(storeName: StoreName, key: string, data: unknown): void;
    /**
     * 获取 Store 数据
     * @param {StoreName} storeName store 名称
     * @param {string} key 待获取的 key
     * @returns {Any}
    */
    getData(storeName: StoreName, key: string): any;
    /**
     * UI 组件注册监听回调
     * @param {StoreName} storeName store 名称
     * @param {string} key 变更的 key
    */
    private notify;
    reset(storeName: StoreName, keyList?: Array<string>, isNotificationNeeded?: boolean): void;
    updateStore(params: any, name?: StoreName): void;
}
