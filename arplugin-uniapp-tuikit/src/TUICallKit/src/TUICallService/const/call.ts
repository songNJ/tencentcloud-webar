/**
 * @property {String} call 1v1 通话 + 群组通话
 * @property {String} CUSTOM 自定义 Store
*/
export enum StoreName {
  CALL = 'call',
  CUSTOM = 'custom'
}
/**
 * @property {String} idle 空闲
 * @property {String} connecting 呼叫等待中
 * @property {String} connected 通话中
*/
export enum CallMediaType {
  UNKNOWN,
  AUDIO,
  VIDEO,
}
/**
 * @property {String} caller 主叫
 * @property {String} callee 被叫
*/
export enum CallRole {
  UNKNOWN = 'unknown',
  CALLEE = 'callee',
  CALLER = 'caller',
}
/**
 * @property {String} idle 空闲
 * @property {String} calling 呼叫等待中
 * @property {String} connected 通话中
*/
export enum CallStatus {
  IDLE = 'idle',
  CALLING = 'calling',
  CONNECTED = 'connected',
}
/**
 * 视频画面显示模式
 * 播放视频流默认使用 cover 模式; 播放屏幕共享流默认使用 contain 模式。
 * @property {String} contain 优先保证视频内容全部显示。视频尺寸等比缩放，直至视频窗口的一边与视窗边框对齐。如果视频尺寸与显示视窗尺寸不一致，在保持长宽比的前提下，将视频进行缩放后填满视窗，缩放后的视频四周会有一圈黑边。
 * @property {String} cover 优先保证视窗被填满。视频尺寸等比缩放，直至整个视窗被视频填满。如果视频长宽与显示窗口不同，则视频流会按照显示视窗的比例进行周边裁剪或图像拉伸后填满视窗
 * @property {String} fill 保证视窗被填满的同时保证视频内容全部显示，但是不保证视频尺寸比例不变。视频的宽高会被拉伸至和视窗尺寸一致。(该选项值自 v4.12.1 开始支持)
*/
export enum VideoDisplayMode {
  CONTAIN = 'contain',
  COVER = 'cover',
  FILL = 'fill',
}
/**
 * 视频分辨率
 * @property {String} 480p 
 * @property {String} 720p 
 * @property {String} 1080p 
*/
export enum VideoResolution {
  RESOLUTION_480P = '480p',
  RESOLUTION_720P = '720p',
  RESOLUTION_1080P = '1080p',
}
// 支持的语言
export enum LanguageType {
  EN = 'en',
  'ZH-CN' = 'zh-cn',
  JA_JP = 'ja_JP',
}

export type TDeviceList = {
  cameraList: any[],
  microphoneList: any[],
  currentCamera: any,
  currentMicrophone: any,
};

/* === 【原来 TUICallKit 对外暴露】=== */
// 原来 web callKit 定义通知外部状态变更的变量, 对外暴露
export const StatusChange = {
  IDLE: "idle",
  BE_INVITED: "be-invited",
  DIALING_C2C: "dialing-c2c",
  DIALING_GROUP: "dialing-group",
  CALLING_C2C_AUDIO: "calling-c2c-audio",
  CALLING_C2C_VIDEO: "calling-c2c-video",
  CALLING_GROUP_AUDIO: "calling-group-audio",
  CALLING_GROUP_VIDEO: "calling-group-video",
} as const;

/* === 【小程序使用】=== */
/**
 * @property {String} ear 听筒
 * @property {String} speaker 免提
*/
export enum AudioPlayBackDevice {
  EAR = 'ear',
  SPEAKER = 'speaker',
};

export enum DeviceType {
  MICROPHONE = 'microphone',
  CAMERA = 'camera',
  SPEAKER = 'speaker',
}

export enum CameraPosition {
  FRONT = 0,
  BACK = 1,
}
