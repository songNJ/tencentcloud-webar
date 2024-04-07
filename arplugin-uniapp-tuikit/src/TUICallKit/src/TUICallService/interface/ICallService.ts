import { CallStatus, CallRole } from '../const/index';

/**
 * @interface ITUICallService
*/
export interface ITUICallService {

  /**
   * 初始化 Service
   * @function
   * @private
   */
  init(params: any): void;

  /**
   * 1v1 通话
   * @function
   * @param {SwitchUserStatusParams} options 用户状态控制参数
   */
  call(callParams: ICallParams): void;
}

type SDKAppID = { SDKAppID: number; } | { sdkAppID: number; };
export interface IInitParamsBase {
  userID: string;
  userSig: string;
  tim?: any;
  isFromChat?: boolean;
}
export type IInitParams = IInitParamsBase & SDKAppID;
// call params interface
export interface ICallParams {
  userID: string;
  type: number;
  roomID?: number;
  userData?: string;
  timeout?: number;
  offlinePushInfo?: IOfflinePushInfo;
}
// groupCall params interface
export interface IGroupCallParams {
  userIDList: Array<string>;
  type: number;
  groupID: string;
  roomID?: number;
  userData?: string;
  timeout?: number;
  offlinePushInfo?: IOfflinePushInfo;
}
// userInfo interface
export interface IUserInfo {
  userId: string;
  nick?: string;
  avatar?: string;
  remark?: string;
  displayUserInfo?: string; // 远端用户信息展示: remark -> nick -> userId, 简化 UI 组件; 本地用户信息展示: nick -> userId
  isAudioAvailable?: boolean; // 用来设置: 麦克风是否打开
  isVideoAvailable?: boolean; // 用来设置: 摄像头是否打开
  volume?: number;
  isEnter?: boolean; // 远端用户, 用来控制预览远端是否显示 loading 效果; 本地用户, 用来控制 "呼叫"、"接通" 接通后显示的 loading 效果
  domId?: string; // 播放流 dom 节点, localUserInfo 的 domId = 'localVideo'; remoteUserInfo 的 domId 就是 userId
}
export interface IOfflinePushInfo {
  title?: string,
  description?: string,
  androidOPPOChannelID?: string,
  extension: String
}
export interface ICallbackParam {
  beforeCalling?: (...args: any[]) => void;
  afterCalling?: (...args: any[]) => void;
  onMinimized?: (...args: any[]) => void;
  onMessageSentByMe?: (...args: any[]) => void;
  kickedOut?: (...args: any[]) => void;
  statusChanged?: (...args: any[]) => void;
}

export interface ISelfInfoParams {
  nickName: string;
  avatar: string;
}

export interface IBellParams {
  callRole?: CallRole; 
  callStatus?: CallStatus;
  isMuteBell?: boolean;
  calleeBellFilePath?: string;
}
export interface IInviteUserParams {
  userIDList: string[];
  offlinePushInfo?: IOfflinePushInfo;
}
export interface IJoinInGroupCallParams {
  type: number;
  groupID: string;
  roomID: number;
}
