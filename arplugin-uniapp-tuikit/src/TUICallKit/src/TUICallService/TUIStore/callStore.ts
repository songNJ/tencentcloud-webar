import { CallStatus, CallRole, CallMediaType, VideoDisplayMode, VideoResolution, CameraPosition } from '../const/index';
import { ICallStore } from '../interface/ICallStore';
import { getLanguage } from '../utils/common-utils';

export default class CallStore {
  public defaultStore: ICallStore = {
    callStatus: CallStatus.IDLE,
    callRole: CallRole.UNKNOWN,
    callMediaType: CallMediaType.UNKNOWN,
    localUserInfo: { userId: '' },
    localUserInfoExcludeVolume: { userId: '' },
    remoteUserInfoList: [],
    remoteUserInfoExcludeVolumeList: [],
    callerUserInfo: { userId: '' },
    isGroup: false,
    callDuration: '00:00:00', // 通话时长
    callTips: '', // 通话提示的信息. 例如: '等待谁接听', 'xxx 拒绝通话', 'xxx 挂断通话'
    toastInfo: { text: '' }, // 远端用户挂断、拒绝、超时、忙线等的 toast 提示信息
    isMinimized: false, // 用来记录当前是否悬浮窗模式
    enableFloatWindow: false, // 开启/关闭悬浮窗功能，设置为false，通话界面左上角的悬浮窗按钮会隐藏
    bigScreenUserId: '', // 当前大屏幕显示的 userID 用户
    language: getLanguage(), // en, zh-cn
    isClickable: false, // 是否可点击, 用于按钮增加 loading 效果，不可点击
    deviceList: { cameraList: [], microphoneList: [], currentCamera: {}, currentMicrophone: {} },
    showPermissionTip: false,
    groupID: '',
    roomID: 0,
    cameraPosition: CameraPosition.FRONT, // 前置或后置，值为front, back
    // TUICallKit 组件上的属性
    displayMode: VideoDisplayMode.COVER, // 设置预览远端的画面显示模式
    videoResolution: VideoResolution.RESOLUTION_480P,
    showSelectUser: false,
    // 小程序相关属性
    pusher: {},
    player: [],
    isEarPhone: false, // 是否是听筒, 默认: false
  };
  public store: ICallStore = Object.assign({}, this.defaultStore);;

  public update(key: keyof ICallStore, data: any): void {
    switch (key) {
      // case 'callTips':
      //   break;
      default:
        // resolve "Type 'any' is not assignable to type 'never'.ts", ref: https://github.com/microsoft/TypeScript/issues/31663
        (this.store[key] as any) = data as any;
    }
  }

  public getData(key: string | undefined): any {
    if (!key) return this.store;
    return this.store[key as keyof ICallStore];
  }
  // reset call store
  public reset(keyList: Array<string> = []) {
    if (keyList.length === 0) {
      keyList = Object.keys(this.store);
    }
    const resetToDefault = keyList.reduce((acc, key) => ({ ...acc, [key]: this.defaultStore[key as keyof ICallStore] }), {});
    this.store = {
      ...this.defaultStore,
      ...this.store,
      ...resetToDefault,
    };
  }
}
