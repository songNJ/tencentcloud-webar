export * from './call';
export * from './error';
export * from './log';

// import { keys } from 'ts-transformer-keys';
// import { ICallStore } from '../interface/store';
// console.warn('--> ', keys<ICallStore>())

export const CALL_DATA_KEY: any = {
  CALL_STATUS: 'callStatus',
  CALL_ROLE: 'callRole',
  CALL_MEDIA_TYPE: 'callMediaType',
  LOCAL_USER_INFO: 'localUserInfo',
  LOCAL_USER_INFO_EXCLUDE_VOLUMN: 'localUserInfoExcludeVolume',
  REMOTE_USER_INFO_LIST: 'remoteUserInfoList',
  REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST: 'remoteUserInfoExcludeVolumeList',
  CALLER_USER_INFO: 'callerUserInfo',
  IS_GROUP: 'isGroup',
  CALL_DURATION: 'callDuration',
  CALL_TIPS: 'callTips',
  TOAST_INFO: 'toastInfo',
  IS_MINIMIZED: 'isMinimized',
  ENABLE_FLOAT_WINDOW: 'enableFloatWindow',
  BIG_SCREEN_USER_ID: 'bigScreenUserId',
  LANGUAGE: 'language',
  IS_CLICKABLE: 'isClickable',
  DISPLAY_MODE: 'displayMode',
  VIDEO_RESOLUTION: 'videoResolution',
  PUSHER: 'pusher',
  PLAYER: 'player',
  IS_EAR_PHONE: 'isEarPhone',
  SHOW_PERMISSION_TIP: 'SHOW_PERMISSION_TIP',
  GROUP_ID: 'groupID',
  ROOM_ID: 'roomID',
  SHOW_SELECT_USER: 'showSelectUser',
};

export const NAME = {
  PREFIX: '【CallService】',
  AUDIO: 'audio',
  VIDEO: 'video',
  LOCAL_VIDEO: 'localVideo',
  ERROR: 'error',
  TIMEOUT: 'timeout',
  RAF: 'raf',
  INTERVAL: 'interval',
  DEFAULT: 'default',
  BOOLEAN: 'boolean',
  STRING: 'string',
  NUMBER: 'number',
  OBJECT: 'object',
  ARRAY: 'array',
  FUNCTION: 'function',
  UNDEFINED: "undefined",
  ALL: 'all',
  MYSELF: 'myself',
  DEVICE_LIST: 'deviceList',
  CAMERA_POSITION: 'cameraPosition',
  ...CALL_DATA_KEY,
};

export const AudioCallIcon = 'https://web.sdk.qcloud.com/component/TUIKit/assets/call.png';
export const VideoCallIcon = 'https://web.sdk.qcloud.com/component/TUIKit/assets/call-video-reverse.svg';
export const MAX_NUMBER_ROOM_ID = 2147483647;
export enum PLATFORM {
  // eslint-disable-next-line no-unused-vars
  MAC = 'mac',
  // eslint-disable-next-line no-unused-vars
  WIN = 'win',
}
