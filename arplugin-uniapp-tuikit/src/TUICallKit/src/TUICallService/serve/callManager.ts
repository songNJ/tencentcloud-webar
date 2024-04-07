import { TUICallKitServer, NAME, TUIStore, StoreName } from '../../index';
import { CallStatus } from '../const/index';
import { avoidRepeatedCall } from '../utils/validate/index';
/**
 * @param {Number} sdkAppID      用户的sdkAppID           必传
 * @param {String} userID        用户的userID             必传
 * @param {String} userSig       用户的userSig            必传
 * @param {String} globalCallPagePath  跳转的路径          必传
 * @param {ChatSDK} tim           tim实例                 非必传
 */
const PREFIX = 'callManager';
export class CallManager {
  private _globalCallPagePath:string = '';
  private _isPageRedirected:boolean = false;
  @avoidRepeatedCall()
  public async init(params) {
    const { sdkAppID, userID, userSig, globalCallPagePath, tim } = params;
    if (!globalCallPagePath) {
      console.error(`${PREFIX} globalCallPagePath Can not be empty!`);
      return;
    };
    this._globalCallPagePath = globalCallPagePath;
    try {
      await TUICallKitServer.init({
        sdkAppID,
        userID,
        userSig,
        tim,
      });
      this._watchTUIStore();
      // 全局监听下，关闭悬浮窗
      TUICallKitServer.enableFloatWindow(false);
      console.log(`${PREFIX} init Ready!`);
    } catch (error) {
      console.error(`${PREFIX} init fail!`);
    }
  }

  // =========================【监听 TUIStore 中的状态】=========================
  private _watchTUIStore() {
    TUIStore?.watch(StoreName.CALL, {
      [NAME.CALL_STATUS]: this._handleCallStatusChange,
    }, {
      notifyRangeWhenWatch: NAME.MYSELF,
    });
  }

  private _unwatchTUIStore() {
    TUIStore?.unwatch(StoreName.CALL, {
      [NAME.CALL_STATUS]: this._handleCallStatusChange,
    });
  }

  private _handleCallStatusChange = async (value: CallStatus) => {
    switch (value) {
      case CallStatus.CALLING:
      case CallStatus.CONNECTED:
        this._handleCallStatusToCalling();
        break;

      case CallStatus.IDLE:
        this._handleCallStatusToIdle();
        break;
    }
  };

  private _handleCallStatusToCalling() {
    if (this._isPageRedirected) return;
    // @ts-ignore
    wx.navigateTo({
      url: `/${this._globalCallPagePath}`,
      success: () => {
        this._isPageRedirected = true;
      },
      fail: () => {
        console.error(`${PREFIX} navigateTo fail!`);
      },
      complete: () => {},
    });
  }

  private _handleCallStatusToIdle() {
    if (!this._isPageRedirected) return;
    // @ts-ignore
    wx.navigateBack({
      success: () => {
        this._isPageRedirected = false;
      },
      fail: () => {
        console.error(`${PREFIX} navigateBack fail!`);
      },
      complete: () => {},
    });
  }

  // 卸载 callManger
  public async destroyed() {
    this._globalCallPagePath = '';
    this._isPageRedirected = false;
    this._unwatchTUIStore();
    await TUICallKitServer.destroyed();
  }
}
