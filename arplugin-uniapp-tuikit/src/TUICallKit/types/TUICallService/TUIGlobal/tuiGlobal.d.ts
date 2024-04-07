import { ITUIGlobal } from '../interface/ITUIGlobal';
export default class TUIGlobal implements ITUIGlobal {
    static instance: TUIGlobal;
    global: any;
    isPC: boolean;
    isH5: boolean;
    isWeChat: boolean;
    isApp: boolean;
    isUniPlatform: boolean;
    isOfficial: boolean;
    isWIN: boolean;
    isMAC: boolean;
    constructor();
    /**
     * 获取 TUIGlobal 实例
     * @returns {TUIGlobal}
    */
    static getInstance(): TUIGlobal;
    initEnv(): void;
    initOfficial(SDKAppID: number): void;
}
