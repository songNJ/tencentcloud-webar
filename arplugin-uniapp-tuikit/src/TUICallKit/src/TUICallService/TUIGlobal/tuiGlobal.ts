import { APP_NAMESPACE, IS_PC, IS_H5, IN_WX_MINI_APP, IN_UNI_NATIVE_APP, IN_UNI_APP, IS_MAC, IS_WIN } from '../utils/env';
import { ITUIGlobal } from '../interface/ITUIGlobal';

export default class TUIGlobal implements ITUIGlobal {
  static instance: TUIGlobal;
  public global: any = APP_NAMESPACE;
  public isPC: boolean = false;
  public isH5: boolean = false;
  public isWeChat: boolean = false;
  public isApp: boolean = false;
  public isUniPlatform: boolean = false;
  public isOfficial: boolean = false;
  public isWIN: boolean = false;
  public isMAC: boolean = false;
  constructor() {
    this.initEnv();
  }

  /**
   * 获取 TUIGlobal 实例
   * @returns {TUIGlobal}
  */
  static getInstance() {
    if (!TUIGlobal.instance) {
      TUIGlobal.instance = new TUIGlobal();
    }
    return TUIGlobal.instance;
  }

  initEnv() {
    this.isPC = IS_PC;
    this.isH5 = IS_H5;
    this.isWeChat = IN_WX_MINI_APP;
    this.isApp = IN_UNI_NATIVE_APP && !IN_WX_MINI_APP; // uniApp 打包小程序时 IN_UNI_NATIVE_APP 为 true，所以此处需要增加条件
    this.isUniPlatform = IN_UNI_APP;
    this.isWIN = IS_WIN;
    this.isMAC = IS_MAC;
  }

  initOfficial(SDKAppID: number) {
    this.isOfficial = (SDKAppID === 1400187352 || SDKAppID === 1400188366);
  }
}
