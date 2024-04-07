(function(){"use strict";try{if(typeof document!="undefined"){var e=document.createElement("style");e.appendChild(document.createTextNode("")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { TUICore as H, TUIConstants as O, TUILogin as Oe } from "@tencentcloud/tui-core";
import { TUICallEngine as Ne, EVENT as c } from "tuicall-engine-wx";
var o = /* @__PURE__ */ ((t) => (t.CALL = "call", t.CUSTOM = "custom", t))(o || {}), I = /* @__PURE__ */ ((t) => (t[t.UNKNOWN = 0] = "UNKNOWN", t[t.AUDIO = 1] = "AUDIO", t[t.VIDEO = 2] = "VIDEO", t))(I || {}), p = /* @__PURE__ */ ((t) => (t.UNKNOWN = "unknown", t.CALLEE = "callee", t.CALLER = "caller", t))(p || {}), u = /* @__PURE__ */ ((t) => (t.IDLE = "idle", t.CALLING = "calling", t.CONNECTED = "connected", t))(u || {}), V = /* @__PURE__ */ ((t) => (t.CONTAIN = "contain", t.COVER = "cover", t.FILL = "fill", t))(V || {}), b = /* @__PURE__ */ ((t) => (t.RESOLUTION_480P = "480p", t.RESOLUTION_720P = "720p", t.RESOLUTION_1080P = "1080p", t))(b || {}), he = /* @__PURE__ */ ((t) => (t.EN = "en", t["ZH-CN"] = "zh-cn", t.JA_JP = "ja_JP", t))(he || {});
const _ = {
  IDLE: "idle",
  BE_INVITED: "be-invited",
  DIALING_C2C: "dialing-c2c",
  DIALING_GROUP: "dialing-group",
  CALLING_C2C_AUDIO: "calling-c2c-audio",
  CALLING_C2C_VIDEO: "calling-c2c-video",
  CALLING_GROUP_AUDIO: "calling-group-audio",
  CALLING_GROUP_VIDEO: "calling-group-video"
};
var U = /* @__PURE__ */ ((t) => (t.EAR = "ear", t.SPEAKER = "speaker", t))(U || {}), Y = /* @__PURE__ */ ((t) => (t[t.FRONT = 0] = "FRONT", t[t.BACK = 1] = "BACK", t))(Y || {});
const ne = {
  SWITCH_TO_AUDIO_CALL_FAILED: 60001,
  SWITCH_TO_VIDEO_CALL_FAILED: 60002,
  MICROPHONE_UNAVAILABLE: 60003,
  CAMERA_UNAVAILABLE: 60004,
  BAN_DEVICE: 60005,
  NOT_SUPPORTED_WEBRTC: 60006,
  ERROR_BLACKLIST: 20007
}, Ge = {
  SWITCH_TO_AUDIO_CALL_FAILED: "switchToAudioCall-call-failed",
  SWITCH_TO_VIDEO_CALL_FAILED: "switchToVideoCall-call-failed",
  MICROPHONE_UNAVAILABLE: "microphone-unavailable",
  CAMERA_UNAVAILABLE: "camera-unavailable",
  BAN_DEVICE: "ban-device",
  NOT_SUPPORTED_WEBRTC: "not-supported-webrtc",
  ERROR_BLACKLIST: "blacklist-user-tips"
}, z = {
  CALL_STATUS: "callStatus",
  CALL_ROLE: "callRole",
  CALL_MEDIA_TYPE: "callMediaType",
  LOCAL_USER_INFO: "localUserInfo",
  LOCAL_USER_INFO_EXCLUDE_VOLUMN: "localUserInfoExcludeVolume",
  REMOTE_USER_INFO_LIST: "remoteUserInfoList",
  REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST: "remoteUserInfoExcludeVolumeList",
  CALLER_USER_INFO: "callerUserInfo",
  IS_GROUP: "isGroup",
  CALL_DURATION: "callDuration",
  CALL_TIPS: "callTips",
  TOAST_INFO: "toastInfo",
  IS_MINIMIZED: "isMinimized",
  ENABLE_FLOAT_WINDOW: "enableFloatWindow",
  BIG_SCREEN_USER_ID: "bigScreenUserId",
  LANGUAGE: "language",
  IS_CLICKABLE: "isClickable",
  DISPLAY_MODE: "displayMode",
  VIDEO_RESOLUTION: "videoResolution",
  PUSHER: "pusher",
  PLAYER: "player",
  IS_EAR_PHONE: "isEarPhone",
  SHOW_PERMISSION_TIP: "SHOW_PERMISSION_TIP",
  GROUP_ID: "groupID",
  ROOM_ID: "roomID",
  SHOW_SELECT_USER: "showSelectUser"
}, a = {
  PREFIX: "【CallService】",
  AUDIO: "audio",
  VIDEO: "video",
  LOCAL_VIDEO: "localVideo",
  ERROR: "error",
  TIMEOUT: "timeout",
  RAF: "raf",
  INTERVAL: "interval",
  DEFAULT: "default",
  BOOLEAN: "boolean",
  STRING: "string",
  NUMBER: "number",
  OBJECT: "object",
  ARRAY: "array",
  FUNCTION: "function",
  UNDEFINED: "undefined",
  ALL: "all",
  MYSELF: "myself",
  DEVICE_LIST: "deviceList",
  CAMERA_POSITION: "cameraPosition",
  ...z
}, Fe = "https://web.sdk.qcloud.com/component/TUIKit/assets/call.png", Qe = "https://web.sdk.qcloud.com/component/TUIKit/assets/call-video-reverse.svg", re = 2147483647, Me = {
  // 按钮文案
  hangup: "Hang up",
  reject: "Decline",
  accept: "Accept",
  camera: "Camera",
  microphone: "Microphone",
  speaker: "speaker",
  "open camera": "Open Camera",
  "close camera": "Close Camera",
  "open microphone": "Open Microphone",
  "close microphone": "Close Microphone",
  "video-to-audio": "Switch to audio",
  // 通话结果
  "other side reject call": "other side reject call",
  "reject call": "Reject Call",
  cancel: "Cancel Call",
  "other side line busy": "other side line busy",
  "in busy": "in busy",
  "call timeout": "call timeout",
  "no response from the other side": "no response from the other side",
  "end call": "end call",
  // 通话提示语
  "caller calling message": "Awaiting response",
  "callee calling video message": "invites you to a video call",
  "callee calling audio message": "invites you to a voice call",
  "no microphone access": "no microphone access",
  "no camera access": "no camera access",
  "invite member": "Invite Member",
  "Invited group call": "invites you to a group call",
  waiting: "Calling...",
  me: "(me)",
  // 弹出层文案
  "browser-authorization": "Browser authorization",
  "mac-privacy": "System Preferences -> Security and Privacy -> Privacy",
  "win-privacy": "Setting -> Privacy and Security -> App permissions",
  "mac-preferences": "Open System Preferences",
  "win-preferences": "Open Setting",
  "Please enter userID": "Please enter userID",
  "View more": "View more",
  "people selected": "people selected",
  "Select all": "Select all",
  Cancel: "Cancel",
  Done: "Done",
  // UI3.0 新增
  "camera enabled": "Camera On",
  "camera disabled": "Camera Off",
  "microphone enabled": "Unmuted",
  "microphone disabled": "Muted",
  "speaker phone": "Speaker",
  "ear piece": "Earpiece",
  "wait to be called": "Waiting",
  answered: "Connected",
  "people in the call": " other(s) in the call",
  "failed to obtain speakers": "failed to obtain speakers",
  "you have a new call": "You have a new call",
  // 待废弃文案
  "Those involved": "Those involved in the call are",
  call: "call",
  "video-call": "video call",
  "audio-call": "audio call",
  search: "search",
  "search-result": "search result",
  "no-user": "user not found",
  "member-not-added": "member not added",
  "input-phone-userID": "phone number or userID",
  "not-login": "not logged in",
  "login-status-expire": "login status is invalid, please refresh the page and try again",
  "experience-multi-call": "experience multi-person calls, please download the full-featured demo: ",
  "not-support-multi-call": "multi-person call interface is not open",
  userID: "userID",
  "already-enter": "entered the call",
  "camera-opened": "Camera on",
  "camera-closed": "Camera off",
  "microphone-opened": "Mic on",
  "microphone-closed": "Mic off",
  timeout: "timeout",
  "kick out": "kick out",
  "image-resolution": "Resolution",
  "default-image-resolution": "Default",
  "invited-person": "Invite",
  "be-rejected": "Call declined, ",
  "be-no-response": "No response, ",
  "be-line-busy": "Line busy, ",
  "be-canceled": "The call is canceled, ",
  "voice-call-end": "Voice call ended",
  "video-call-end": "Video call ended",
  "method-call-failed": "Failed to sync the operation",
  "failed-to-obtain-permission": "Failed to obtain permissions",
  "environment-detection-failed": "Failed to check the environment",
  "switchToAudioCall-call-failed": "switch to audio call method failed",
  "switchToVideoCall-call-failed": "switch to video call method failed",
  "microphone-unavailable": "No mic found",
  "camera-unavailable": "No camera found",
  "ban-device": "Device access denied",
  "not-supported-webrtc": "Your current environment does not support WebRTC",
  "blacklist-user-tips": "The identifier is in blacklist. Failed to send this message!",
  "is-already-calling": "TUICallKit is already on a call",
  "need-init": "Before initiating a call with TUICallKit, ensure that the TUICallKitServer.init() method has executed successfully. ",
  "can't call yourself": "Can't call yourself",
  // eslint-disable-line
  "Use-phone-and-computer": "Use your mobile phone and computer to experience video calls",
  "Wechat scan right QR code": "Wechat scan right QR code",
  "Scan the QR code above": "Scan the QR code above",
  "accept-error": "Accept failed",
  "accept-device-error": "Accept failed, unable to auth calling device",
  "call-error": "Start call failed"
}, Te = {
  // 按钮文案
  hangup: "挂断",
  reject: "拒绝",
  accept: "接受",
  camera: "摄像头",
  microphone: "麦克风",
  speaker: "扬声器",
  "open camera": "打开摄像头",
  "close camera": "关闭摄像头",
  "open microphone": "打开麦克风",
  "close microphone": "关闭麦克风",
  "video-to-audio": "转语音通话",
  // 通话结果
  "other side reject call": "对方已拒绝",
  "reject call": "拒绝通话",
  cancel: "取消通话",
  "other side line busy": "对方忙线",
  "in busy": "正在忙",
  "call timeout": "呼叫超时",
  "end call": "结束通话",
  // 通话提示语
  "caller calling message": "等待对方接受邀请",
  "callee calling video message": "邀请你视频通话",
  "callee calling audio message": "邀请你语音通话",
  "no microphone access": "没有麦克风权限",
  "no camera access": "没有摄像头权限",
  "invite member": "邀请成员",
  "Invited group call": "邀请你加入多人通话",
  "Those involved": "参与通话的有：",
  waiting: "等待接听...",
  me: "(我)",
  // 弹出层文案
  "browser-authorization": "浏览器授权",
  "mac-privacy": "系统偏好设置 -> 安全与隐私 -> 隐私",
  "win-privacy": "设置 -> 隐私和安全性 -> 应用权限",
  "mac-preferences": "打开系统偏好设置",
  "win-preferences": "打开系统设置",
  "Please enter userID": "请输入 userID",
  "View more": "查看更多",
  "people selected": "人已选中",
  "Select all": "全选",
  Cancel: "取消",
  Done: "完成",
  // UI3.0 新增
  "camera enabled": "摄像头已开",
  "camera disabled": "摄像头已关",
  "microphone enabled": "麦克风已开",
  "microphone disabled": "麦克风已关",
  "speaker phone": "扬声器已开",
  "ear piece": "扬声器已关",
  "wait to be called": "等待接听",
  answered: "已接通",
  "people in the call": "人参与通话",
  "failed to obtain speakers": "无法获取扬声器",
  "you have a new call": "您有一个新的通话",
  // 待废弃文案
  timeout: "超时",
  "kick out": "被踢",
  call: "通话",
  "video-call": "视频通话",
  "audio-call": "音频通话",
  search: "搜索",
  "search-result": "搜索结果",
  "Wechat scan right QR code": "微信扫右二维码",
  "Use-phone-and-computer": "用手机与电脑互打体验视频通话",
  "Scan the QR code above": "扫描上方二维码",
  "no-user": "未搜索到用户",
  "member-not-added": "未添加成员",
  "not-login": "未登录",
  "login-status-expire": "登录状态已失效，请刷新网页重试",
  "experience-multi-call": "体验多人通话请下载全功能demo:",
  "not-support-multi-call": "多人通话接口未开放",
  "input-phone-userID": "请输入手机号/用户ID",
  userID: "用户ID",
  "already-enter": "已经进入当前通话",
  "image-resolution": "分辨率",
  "default-image-resolution": "默认分辨率",
  "invited-person": "添加成员",
  "be-rejected": "对方已拒绝，",
  "be-no-response": "对方无应答，",
  "be-line-busy": "对方忙线中，",
  "be-canceled": "对方已取消",
  "voice-call-end": "语音通话结束",
  "video-call-end": "视频通话结束",
  "method-call-failed": "同步操作失败",
  "failed-to-obtain-permission": "权限获取失败",
  "environment-detection-failed": "环境检测失败",
  "switchToAudioCall-call-failed": "切语音调用失败",
  "switchToVideoCall-call-failed": "切视频调用失败",
  "microphone-unavailable": "没有可用的麦克风设备",
  "camera-unavailable": "没有可用的摄像头设备",
  "ban-device": "用户禁止使用设备",
  "not-supported-webrtc": "当前环境不支持 WebRTC",
  "blacklist-user-tips": "发起通话失败，被对方拉入黑名单，禁止发起！",
  "is-already-calling": "TUICallKit 已在通话状态",
  "need-init": "TUICallKit 发起通话前需保证 TUICallKitServer.init() 方法执行成功",
  "can't call yourself": "不能呼叫自己",
  // eslint-disable-line
  "accept-error": "接通失败",
  "accept-device-error": "接通失败，通话设备获取失败",
  "call-error": "发起通话失败"
}, ye = {
  // 按钮文案 
  hangup: "通話終了",
  reject: "拒否",
  accept: "応答",
  camera: "カメラ",
  microphone: "マイク",
  speaker: "スピーカー",
  // 通话结果
  "other side reject call": "通話が拒否されました",
  "reject call": "通話拒否",
  cancel: "通話をキャンセル",
  "other side line busy": "相手が通話中です",
  "in busy": "通話中",
  "call timeout": "呼び出しタイムアウト",
  "end call": "通話終了",
  // 通话提示语
  "caller calling message": "応答を待っています",
  "callee calling video message": "ビデオ通話に招待されました",
  "callee calling audio message": "音声通話に招待されました",
  "no microphone access": "マイクにアクセスできません",
  "no camera access": "カメラにアクセスできません",
  "invite member": "メンバーを招待する",
  // 弹出层文案
  "browser-authorization": "ブラウザ認証",
  "mac-privacy": "システム環境設定 -> セキュリティとプライバシー ->プライバシー",
  "win-privacy": "設定 -> セキュリティとプライバシー ->アプリのアクセス許可",
  "mac-preferences": "システム環境設定を開く",
  "win-preferences": "システム設定を開く",
  "Please enter userID": "ユーザーIDを入力してください",
  "View more": "もっと見る",
  "people selected": "人が選択されました",
  "Select all": "すべて選択",
  Cancel: "キャンセル",
  Done: "完了",
  // UI3.0文案
  "open camera": "オープンカメラ",
  "close camera": "カメラを閉じる",
  "open microphone": "オープンマイク",
  "close microphone": "マイクを閉じる",
  "camera enabled": "カメラオン",
  "camera disabled": "カメラオフ",
  "microphone enabled": "マイクオン",
  "microphone disabled": "マイクオフ",
  "speaker phone": "スピーカーオン",
  "wait to be called": "待機中",
  answered: "接続済み",
  "people in the call": "通話に参加している人たち",
  "failed to obtain speakers": "スピーカーが見つかりません",
  "you have a new call": "新しい通話があります",
  // 待废弃文案
  timeout: "タイムアウト",
  "kick out": "キックアウトされました",
  "Invited group call": "グループ通話に招待されました。",
  "Those involved": "参加者：",
  call: "通話",
  "video-call": "ビデオ通話",
  "audio-call": "音声通話",
  search: "検索",
  "search-result": "検索結果",
  "Wechat scan right QR code": "WeChatで右側にあるQRコードを読み取ります。",
  "Use-phone-and-computer": "携帯電話とコンピュータを使用してビデオ通話を体験してください",
  "Scan the QR code above": "上のQRコードを読み取ります。",
  "no-user": "ユーザーが見つかりませんでした",
  "member-not-added": "メンバーが追加されていません",
  "not-login": "ログインしていません",
  "login-status-expire": "ログインの有効期限が過ぎています。ページを更新してもう一度お試しください",
  "experience-multi-call": "複数人で同時に音声通話できるグループ通話機能を体験するには、全機能のデモをダウンロードしてください",
  "not-support-multi-call": "グループ通話インターフェイスが開いていません",
  "input-phone-userID": "携帯電話番号/ユーザーIDを入力してください",
  userID: "ユーザーID",
  "already-enter": "すでに通話に参加しています",
  waiting: "応答を待っています...",
  "camera-opened": "カメラがオンになっています",
  "camera-closed": "カメラがオフになっています",
  "microphone-opened": "マイクがオンになっています",
  "microphone-closed": "マイクがオフになっています",
  "image-resolution": "解像度",
  "default-image-resolution": "デフォルト解像度",
  "invited-person": "メンバーを招待",
  "video-to-audio": "音声通話に切り替えます",
  me: "(自分)",
  "be-rejected": "通話が拒否されました, ",
  "be-no-response": "応答なし, ",
  "be-line-busy": "相手が通話中です, ",
  "be-canceled": "相手が通話をキャンセルしました",
  "voice-call-end": "音声通話が終了しました",
  "video-call-end": "ビデオ通話が終了しました",
  "method-call-failed": "操作の同期に失敗しました",
  "failed-to-obtain-permission": "権限の取得に失敗しました",
  "environment-detection-failed": "環境の検出に失敗しました",
  "switchToAudioCall-call-failed": "音声通話に切り替えることはできません",
  "switchToVideoCall-call-failed": "ビデオ通話に切り替えることはできません",
  "microphone-unavailable": "使用できるマイクがありません",
  "camera-unavailable": "使用できるカメラがありません",
  "ban-device": "デバイスへのアクセスが拒否されました",
  "not-supported-webrtc": "現在の環境はWebRTCをサポートしていません",
  "blacklist-user-tips": "ユーザーはブラックリストに登録され、通話が開始できませんでした",
  "is-already-calling": "TUICallKit はすでに通話中です",
  "need-init": "TUICallKitで通話を開始する前に、TUICallKitServer.init() メソッドが正常に実行されたことを確認してください。",
  "can't call yourself": "自分に電話をかけることができません",
  "accept-error": "接続できませんでした",
  "accept-device-error": "接続できませんでした。発信側デバイスを認証できません",
  "call-error": "通話が開始できませんでした"
}, B = {
  OTHER_SIDE: "other side",
  CANCEL: "cancel",
  OTHER_SIDE_REJECT_CALL: "other side reject call",
  REJECT_CALL: "reject call",
  OTHER_SIDE_LINE_BUSY: "other side line busy",
  IN_BUSY: "in busy",
  CALL_TIMEOUT: "call timeout",
  END_CALL: "end call",
  TIMEOUT: "timeout",
  KICK_OUT: "kick out",
  CALLER_CALLING_MSG: "caller calling message",
  CALLER_GROUP_CALLING_MSG: "wait to be called",
  CALLEE_CALLING_VIDEO_MSG: "callee calling video message",
  CALLEE_CALLING_AUDIO_MSG: "callee calling audio message",
  NO_MICROPHONE_DEVICE_PERMISSION: "no microphone access",
  NO_CAMERA_DEVICE_PERMISSION: "no camera access"
}, ce = {
  en: Me,
  "zh-cn": Te,
  ja_JP: ye
};
function T(t) {
  var i;
  const e = l.getData(o.CALL, a.LANGUAGE);
  for (const s in ce)
    if (s === e) {
      const n = ce[s];
      for (const r in n)
        if (r === t)
          return n[r];
    }
  const A = (i = t.en) == null ? void 0 : i.key;
  return console.error(`${a.PREFIX}translation is not found: ${t}.`), A;
}
function Pe() {
  wx.hideKeyboard({
    complete: () => {
    }
  });
}
function me() {
  wx.getSystemInfoSync().platform === "devtools" && wx.showModal({
    icon: "none",
    title: "运行环境提醒",
    content: "微信开发者工具不支持原生推拉流组件(即 <live-pusher> 和 <live-player> 标签)，请使用真机调试或者扫码预览。",
    showCancel: !1
  });
}
function de() {
  Pe(), me();
}
async function ve(t, e) {
  try {
    de();
    const A = {
      microphone: !0,
      camera: t === I.VIDEO
    };
    return await e._tuiCallEngine.deviceCheck(A) ? u.CALLING : u.IDLE;
  } catch (A) {
    return console.debug(A), u.IDLE;
  }
}
function Ke(t) {
  (t == null ? void 0 : t.code) === -1002 && wx.showModal({
    icon: "none",
    title: "error",
    content: (t == null ? void 0 : t.message) || "",
    showCancel: !1
  });
}
const k = typeof wx < "u" && typeof wx.getSystemInfoSync == "function" && Boolean(wx.getSystemInfoSync().fontSizeSetting), ge = typeof uni < "u" && typeof uni > "u", Ee = k || ge, De = typeof uni < "u", fe = function() {
  return (typeof uni < "u" || typeof window < "u") && !Ee;
}(), Ve = function() {
  return k ? wx : De ? uni : window;
}(), F = fe && window && window.navigator && window.navigator.userAgent || "", be = /Android/i.test(F), Ye = /(?:Windows Phone)/.test(F), He = /(?:SymbianOS)/.test(F), xe = /iPad/i.test(F) || /iPhone/i.test(F) || /iPod/i.test(F), Be = be || Ye || He || xe, ee = fe && !Be, Je = ee && F.includes("Windows NT"), ze = ee && F.includes("Mac");
let pe = class m {
  constructor() {
    this.global = Ve, this.isPC = !1, this.isH5 = !1, this.isWeChat = !1, this.isApp = !1, this.isUniPlatform = !1, this.isOfficial = !1, this.isWIN = !1, this.isMAC = !1, this.initEnv();
  }
  /**
   * 获取 TUIGlobal 实例
   * @returns {TUIGlobal}
  */
  static getInstance() {
    return m.instance || (m.instance = new m()), m.instance;
  }
  initEnv() {
    this.isPC = ee, this.isH5 = Be, this.isWeChat = k, this.isApp = ge && !k, this.isUniPlatform = De, this.isWIN = Je, this.isMAC = ze;
  }
  initOfficial(e) {
    this.isOfficial = e === 1400187352 || e === 1400188366;
  }
};
const Se = function(t) {
  return typeof t === a.UNDEFINED;
}, ke = function(t) {
  if (typeof t !== a.OBJECT || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  if (e === null)
    return !0;
  let A = e;
  for (; Object.getPrototypeOf(A) !== null; )
    A = Object.getPrototypeOf(A);
  return e === A;
}, _e = function(t) {
  return typeof Array.isArray === a.FUNCTION ? Array.isArray(t) : Object.prototype.toString.call(t).match(/^\[object (.*)\]$/)[1].toLowerCase() === a.ARRAY;
}, Z = function(t) {
  return typeof t === a.STRING;
}, We = function(t) {
  return typeof t === a.BOOLEAN;
}, Ue = function(t) {
  return (
    // eslint-disable-next-line
    t !== null && (typeof t === a.NUMBER && !isNaN(t - 0) || typeof t === a.OBJECT && t.constructor === Number)
  );
};
function je(t) {
  const e = Math.floor(t / 3600), A = Math.floor(t % 3600 / 60), i = Math.floor(t % 60);
  let s = e > 9 ? `${e}` : `0${e}`;
  return s += A > 9 ? `:${A}` : `:0${A}`, s += i > 9 ? `:${i}` : `:0${i}`, s;
}
function Ce(t) {
  return (t == null ? void 0 : t.message.indexOf("is ongoing, please avoid repeated calls")) !== -1;
}
function qe(t) {
  const { message: e } = t;
  return e.indexOf("NotAllowedError: Permission denied") !== -1;
}
function X() {
  return Date.now();
}
const Xe = function(t) {
  return typeof t === a.FUNCTION;
}, Ze = () => {
  if (pe.getInstance().isWeChat)
    return "zh-cn";
  const t = ((navigator == null ? void 0 : navigator.language) || (navigator == null ? void 0 : navigator.userLanguage) || "").substr(0, 2);
  let e = "en";
  switch (t) {
    case "zh":
      e = "zh-cn";
      break;
    case "ja":
      e = "ja_JP";
      break;
    default:
      e = "en";
  }
  return e;
}, $e = function(t) {
  return Object.prototype.toString.call(t).match(/^\[object (.*)\]$/)[1].toLowerCase();
};
function et(t, e, A) {
  if (!t.hasOwnProperty(e))
    return t;
  const i = {};
  return Object.keys(t).forEach((s) => {
    s === e ? i[A] = t[s] : i[s] = t[s];
  }), i;
}
const tt = "data:audio/mpeg;base64,SUQzAwAAAAAAGFRYWFgAAAAOAAAAVFhYWABpc29taXNvMv/zNGQAAqwAvnihCAADQAF4CUAQAFYAg3Lh8u+XUD5///wx//wQOAhKAgb/////xOoH4g8Hz4Pq8RoAbdTgMsMt9hcb990EP//zNGQQBPDjEgDItAAFWcIoAYoQAN9P/03QQ//umn//91SXL5uXP+pf8WYTvzgJPAQ+p/7f///1//6f///WH///F4BtJhNFkP/zNGQGA/jjNADHiAAEQDJcAYkQAGWrn6vw6ljfPtj/////////9Pv9sL/mL/QezSepgwrimv07//////y3u602OiyhOYb+LP/zNGQIBKTBKADoCACDoCZMAckAAKHKCUIAFsqGZXtSZ/////////Sn/Vy3nVUOJBqSX2UAkQxBddzv//////yq3lcgaTmTQ//zNGQHA9SrJgA8AliD4C5IAApYAKh3FKlMunKHm8H/2//77vkdqB2xfsXaHiDKBGtFKqONF3/////Z9VXClT5ND+syHkjBq//zNGQLBITJIAA8AmQEiDI4AAjSAGa1Vffm3ff/1/0//11tvZpAaIw3dBiIrjJgHQrGVWmdBU1f/////oDqEKrV1OpBUTjQtv/zNGQHAsjDKAAwAl4D0Co8AAmCBHIQNtld6fm0+/VigZzuMnGZlkAMLMJFv/////33UIWeFQkKsaceBsangecHzYXKI//////zNGQUA4QjKAA3CAID8CpEABMCBPfuStx4FQVHYMgKcO6jIJh//////9uIlspQkGQ2YyZscAV83Bv/////ncL6BEiWHyA2K//zNEQbAogfJgAx5hAEwDJcCAsEBtICgF3/////WJaIuuqMCCVGucgkrtwiwBO//////pW4YFRWQhaRRhZZnVwGhf////+ocv/zNEQmApgVJAANjwAFkC5YCApeAolD4kQb+EQJYNKwLWGmc6sqMBwJvf////6tDEOWDgFJk1VywKMGoM2f////+N1JmgJuPv/zNGQuA4AbJAAl5hIDwC48AAIGBEho7wTL5b6kSO7IUAA5uDABYNNjGDBSJEN//////xtQsszVy27IcWBbQkLgzv7YmZYW///zNGQ2AqzFNAgcA1+D8CZIAAhMAP/3/rozCAsBjIqCY/DBWMfQZp1f/////0F6phXSNisgAJjo6icT2vpvM/Vf9v///97eu//z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", Ie = "data:audio/mpeg;base64,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//BP/+hwIa///Nf///wqXf/1IwFkb//wi3/1Pf/7FEQGAABjEVkFKKAADSOrIKOcAAKAUWQYooAAUpGswwRwAF//QA7//6iH/7//E1CP66uDpoqjowL/6/GGwzFQx/T3Vp/9XC73/yvuUKYdmmN6evmjf5L5ZKr/8hlL/f/7FGQCgAB5FF2GBKAADYOrUMEIAAGod2YcVoAANI6rg4pQAEZrqH8GxT/UqjT/+aDlf/6dvj/r/4+rR//UH//+wTMuo///86//9QGR//+wCCxv//+MCD//BP//oAIP///7FGQFAABgEdsNFKAAC2I68KOcAAMggWoYVQAAP46tAwQgAMzq//QwCv//4WM/+a0//YWHBbCL/5Hi/IAIkheLBSvsvr6F98kyv/4Zg7A3/0+pcfN//8bL5ar/+8wV/v/7FGQCgACDFF0GFKAADkQLYMCIAAGod2occoAANg7rw4pQAKbXi7oTBez1IPl9X/4G2b//1b7/r6/a/Gy//6HAX//+gDAv///nHf/xoBf//hF////ILP0V//lQuP//qP/7FGQDj/BVHVmBQC2QC6O6wDQHsgGEd2gUI4AAMA7sAopQAE8l+F//2DK3//y4f+Bj5j/+oX//8FpP///x0n//GAf//8Kf///xIcrp/ZHCA4SBM2nH8U7C55TDl+3X6P/7FGQKAADZI1uGFOAAEoRrMMKUAAGQd24cUQAANQ7sQ44gAHOZwyYabiX/9COkKb/T6rj9/09fUt+LGTgn/8YALf/+g43///kFf/zgX///UK////hxPTX/+4Sz//+sR//7FGQEA7BbHdmBoC2QDSEL3gADCQGgAXyUIQAAMw7rwpRwAK/hAeAAAAdAAAAAHQz///6wB/xxxyrjsayv6H/+r/+aBD//+Nm///8QulX+1VhmOIUu/+2UD0jR2CVfp//7FGQIgADVI1uGCOACD+RrYMCIAAGcd2ocE4AAMw7sQ4RQAGP+f8eIEjMMke//iRoP//tvp+v/Unyv4pqf/5n//84CQx///0FRv/+K///C3///6gKLdKr//EJ//9QHx//7FGQED/BSHdkBQBWQC4PKwCgHsgFYR2wUI4AANA7sAopQAD5hv/6Br//+SDvyge2n/+gP//8ISf/w9t//oDv//8K///8ggL6a+nTBTVf043E0UOgZIIdw1v/9FHfE3//7FGQLAADO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";
class at {
  constructor() {
    this._bellContext = null, this._isMuteBell = !1, this._calleeBellFilePath = Ie, this._callRole = p.UNKNOWN, this._callStatus = u.IDLE, this._bellContext = wx.createInnerAudioContext(), this._bellContext.loop = !0;
  }
  setBellSrc() {
    const e = wx.getFileSystemManager();
    try {
      let A = tt;
      this._callRole === p.CALLEE && (A = this._calleeBellFilePath || Ie), e.readFileSync(A, "utf8", 0), this._bellContext.src = A;
    } catch (A) {
      console.warn(`${a.PREFIX}Failed to setBellSrc, ${A}`);
    }
  }
  setBellProperties(e) {
    this._callRole = e.callRole || this._callRole, this._callStatus = e.callStatus || this._callStatus, this._calleeBellFilePath = e.calleeBellFilePath || this._calleeBellFilePath, this._isMuteBell = Se(e.isMuteBell) ? this._isMuteBell : e.isMuteBell;
  }
  async play() {
    try {
      if (this._callStatus !== u.CALLING)
        return;
      this.setBellSrc(), this._callRole === p.CALLEE && !this._isMuteBell && await this._bellContext.play(), this._callRole === p.CALLER && await this._bellContext.play();
    } catch (e) {
      console.warn(`${a.PREFIX}Failed to play audio file, ${e}`);
    }
  }
  async stop() {
    try {
      this._bellContext.stop();
    } catch (e) {
      console.warn(`${a.PREFIX}Failed to stop audio file, ${e}`);
    }
  }
  async setBellMute(e) {
    this._callStatus !== u.CALLING && this._callRole !== p.CALLEE || (e ? await this.stop() : await this.play());
  }
  destroy() {
    try {
      this._isMuteBell = !1, this._calleeBellFilePath = "", this._callRole = p.UNKNOWN, this._callStatus = u.IDLE, this._bellContext.destroy(), this._bellContext = null;
    } catch (e) {
      console.warn(`${a.PREFIX}Failed to destroy, ${e}`);
    }
  }
}
function f() {
  return function(t, e, A) {
    const i = A.value, s = /* @__PURE__ */ new Set();
    return A.value = async function(...n) {
      if (s.has(this)) {
        console.warn(`${a.PREFIX}previous ${e}() is ongoing, please avoid repeated calls`);
        return;
      }
      try {
        s.add(this);
        const r = await i.apply(this, n);
        return s.delete(this), r;
      } catch (r) {
        throw s.delete(this), r;
      }
    }, A;
  };
}
const P = a.PREFIX + "API";
function w(t) {
  return function(e, A, i) {
    let s = i.value;
    return i.value = function(...n) {
      return At.call(this, t, n, A), s.apply(this, n);
    }, i;
  };
}
function At(t, e, A) {
  try {
    if (e[0].SDKAppID || (t = et(t, "SDKAppID", "sdkAppID")), _e(t))
      for (let i = 0; i < t.length; i++)
        ue.call(this, {
          ...t[i],
          value: e[i],
          name: A
        });
    else
      for (const i in t)
        t.hasOwnProperty(i) && ue.call(this, {
          ...t[i],
          value: e[0][i],
          name: A,
          key: i
        });
  } catch (i) {
    throw console.error(i), i;
  }
}
function ue({ required: t, rules: e, range: A, value: i, allowEmpty: s, name: n, key: r }) {
  if (Se(i)) {
    if (t)
      throw new Error(`${P}<${n}>: ${r} is required.`);
    return;
  }
  const C = e.some((E) => E === $e(i));
  let d = "";
  if (!C) {
    for (let E = 0; E < e.length; E++) {
      let S = e[E];
      S = S.replace(S[0], S[0].toUpperCase()), d += `${S}/`;
    }
    throw d = d.substring(0, d.length - 1), new Error(`${P}<${n}>: ${r} must be ${d}, current ${r} is ${typeof i}.`);
  }
  if (s === !1 && Z(i) && i.trim() === "")
    throw new Error(`${P}<${n}>: ${r} is blank.`);
  if (_e(A) && A && A.indexOf(i) === -1)
    throw new Error(`${P}<${n}>: ${r} error, only be ${A}, current ${r} is ${i}.`);
  if (Z(A) && A.indexOf("~") !== -1) {
    const E = A.split("~");
    if (i < +E[0] || i > +E[1] || Ue(i) && Number.isNaN(i))
      throw new Error(`${P}<${n}>: ${r} error, only be ${A}, current ${r} is ${i}.`);
  }
}
const R = {
  init: {
    SDKAppID: {
      required: !0,
      rules: [a.NUMBER],
      allowEmpty: !1
    },
    userID: {
      required: !0,
      rules: [a.STRING],
      allowEmpty: !1
    },
    userSig: {
      required: !0,
      rules: [a.STRING],
      allowEmpty: !1
    },
    tim: {
      required: !1,
      rules: [a.OBJECT]
    }
  },
  call: {
    userID: {
      required: !0,
      rules: [a.STRING],
      allowEmpty: !1
    },
    type: {
      required: !0,
      rules: [a.NUMBER],
      range: [1, 2],
      allowEmpty: !1
    },
    roomID: {
      required: !1,
      rules: [a.NUMBER],
      // 仅支持数字房间号, 后续会支持字符串房间号
      range: `1~${re}`,
      allowEmpty: !1
    },
    userData: {
      required: !1,
      rules: [a.STRING],
      allowEmpty: !1
    },
    timeout: {
      required: !1,
      rules: [a.NUMBER],
      allowEmpty: !1
    }
  },
  groupCall: {
    userIDList: {
      required: !0,
      rules: [a.ARRAY],
      allowEmpty: !1
    },
    type: {
      required: !0,
      rules: [a.NUMBER],
      range: [1, 2],
      allowEmpty: !1
    },
    groupID: {
      required: !0,
      rules: [a.STRING],
      allowEmpty: !1
    },
    roomID: {
      required: !1,
      rules: [a.NUMBER],
      // 仅支持数字房间号, 后续会支持字符串房间号
      range: `1~${re}`,
      allowEmpty: !1
    },
    timeout: {
      required: !1,
      rules: [a.NUMBER],
      allowEmpty: !1
    },
    userData: {
      required: !1,
      rules: [a.STRING],
      allowEmpty: !1
    },
    offlinePushInfo: {
      required: !1,
      rules: [a.OBJECT],
      allowEmpty: !1
    }
  },
  joinInGroupCall: {
    type: {
      required: !0,
      rules: [a.NUMBER],
      range: [1, 2],
      allowEmpty: !1
    },
    groupID: {
      required: !0,
      rules: [a.STRING],
      allowEmpty: !1
    },
    roomID: {
      required: !0,
      rules: [a.NUMBER],
      allowEmpty: !1
    }
  },
  inviteUser: {
    userIDList: {
      required: !0,
      rules: [a.ARRAY],
      allowEmpty: !1
    }
  },
  setSelfInfo: {
    nickName: {
      required: !1,
      rules: [a.STRING],
      allowEmpty: !1
    },
    avatar: {
      required: !1,
      rules: [a.STRING],
      allowEmpty: !1
    }
  },
  enableFloatWindow: [
    {
      key: "enable",
      required: !1,
      rules: [a.BOOLEAN],
      allowEmpty: !1
    }
  ],
  enableAIVoice: [
    {
      key: "enable",
      required: !0,
      rules: [a.BOOLEAN],
      allowEmpty: !1
    }
  ],
  enableMuteMode: [
    {
      key: "enable",
      required: !0,
      rules: [a.BOOLEAN],
      allowEmpty: !1
    }
  ],
  setCallingBell: [
    {
      key: "filePath",
      required: !1,
      rules: [a.STRING],
      allowEmpty: !0
    }
  ],
  setLanguage: [
    {
      key: "language",
      required: !0,
      rules: [a.STRING],
      allowEmpty: !1
    }
  ],
  setVideoDisplayMode: [
    {
      key: "displayMode",
      required: !0,
      rules: [a.STRING],
      range: [V.CONTAIN, V.COVER, V.FILL],
      allowEmpty: !1
    }
  ],
  setVideoResolution: [
    {
      key: "resolution",
      required: !0,
      rules: [a.STRING],
      range: [b.RESOLUTION_1080P, b.RESOLUTION_480P, b.RESOLUTION_720P],
      allowEmpty: !1
    }
  ]
};
function $(t, e) {
  const A = {
    userId: t,
    nick: "",
    avatar: "",
    remark: "",
    displayUserInfo: "",
    isAudioAvailable: !1,
    isVideoAvailable: !1,
    isEnter: !1,
    domId: e || t
  };
  return e ? A : { ...A, isEnter: !1 };
}
async function it(t, e, A) {
  var s, n, r, C, d;
  let i = $(t, a.LOCAL_VIDEO);
  try {
    if (!e)
      return i;
    const E = await e.getMyProfile(), S = A == null ? void 0 : A.getData(o.CALL, a.LOCAL_USER_INFO);
    return (E == null ? void 0 : E.code) === 0 && (i = {
      ...i,
      ...S,
      userId: (s = E == null ? void 0 : E.data) == null ? void 0 : s.userID,
      nick: (n = E == null ? void 0 : E.data) == null ? void 0 : n.nick,
      avatar: (r = E == null ? void 0 : E.data) == null ? void 0 : r.avatar,
      displayUserInfo: ((C = E == null ? void 0 : E.data) == null ? void 0 : C.nick) || ((d = E == null ? void 0 : E.data) == null ? void 0 : d.userID)
    }), i;
  } catch (E) {
    return console.error(`${a.PREFIX}getMyProfile failed, error: ${E}.`), i;
  }
}
async function x(t, e, A) {
  let i = t.map((s) => $(s));
  try {
    if (!e)
      return i;
    const s = await e.getFriendProfile({ userIDList: t });
    if (s.code === 0) {
      const { friendList: n = [], failureUserIDList: r = [] } = s.data;
      let C = r.map((g) => g.userID);
      if (r.length > 0) {
        const g = await e.getUserProfile({ userIDList: r.map((Q) => Q.userID) });
        (g == null ? void 0 : g.code) === 0 && (C = (g == null ? void 0 : g.data) || []);
      }
      const d = A == null ? void 0 : A.getData(o.CALL, a.REMOTE_USER_INFO_LIST), E = n.map((g) => g.userID), S = C.map((g) => g.userID);
      i = t.map((g) => {
        var te, ae, Ae, ie, le, se, oe;
        const Q = $(g), N = E.indexOf(g), D = S.indexOf(g);
        let M = "", y = "", j = "", q = "";
        N !== -1 && (M = ((te = n[N]) == null ? void 0 : te.remark) || "", y = ((Ae = (ae = n[N]) == null ? void 0 : ae.profile) == null ? void 0 : Ae.nick) || "", j = M || y || Q.userId || "", q = ((le = (ie = n[N]) == null ? void 0 : ie.profile) == null ? void 0 : le.avatar) || ""), D !== -1 && (y = ((se = C[D]) == null ? void 0 : se.nick) || "", j = y || Q.userId || "", q = ((oe = C[D]) == null ? void 0 : oe.avatar) || "");
        const we = d.find((Re) => Re.userId === g) || {};
        return { ...Q, ...we, remark: M, nick: y, displayUserInfo: j, avatar: q };
      });
    }
    return i;
  } catch (s) {
    return console.error(`${a.PREFIX}getRemoteUserProfile failed, error: ${s}.`), i;
  }
}
function G(t, e, A, i) {
  const s = t.getData(o.CALL, a.IS_GROUP);
  let n = `${T(e)}`;
  return s && (n = A ? `${A} ${n}` : n, n = i ? `${n} ${i}` : n), n;
}
function J(t) {
  const e = t.getData(o.CALL, a.CALL_STATUS);
  if (e === u.IDLE)
    return _.IDLE;
  const A = t.getData(o.CALL, a.IS_GROUP);
  if (e === u.CALLING)
    return A ? _.DIALING_GROUP : _.DIALING_C2C;
  const i = t.getData(o.CALL, a.CALL_MEDIA_TYPE);
  return A ? i === I.AUDIO ? _.CALLING_GROUP_AUDIO : _.CALLING_GROUP_VIDEO : i === I.AUDIO ? _.CALLING_C2C_AUDIO : _.CALLING_C2C_VIDEO;
}
async function lt(t, e, A, i) {
  let s = [];
  try {
    const n = await e.getGroupMemberList({ groupID: t, count: A, offset: i });
    if (n.code === 0)
      return n.data.memberList || s;
  } catch (n) {
    return console.error(`${a.PREFIX}getGroupMember failed, error: ${n}.`), s;
  }
}
async function st(t, e) {
  let A = {};
  try {
    const i = await e.getGroupProfile({ groupID: t });
    if (i.code === 0)
      return i.data.group || A;
  } catch (i) {
    return console.error(`${a.PREFIX}getGroupProfile failed, error: ${i}.`), A;
  }
}
class W {
  static generateTaskID() {
    return this.currentTaskID++;
  }
  /**
   *
   * @param {string} taskName 'interval' 'timeout'
   * @param {function} callback
   * @param {object} options include:
   * @param {number} options.delay millisecond
   * @param {number} options.count 定时器回调执行次数，0 无限次 or n次
   * @param {boolean} options.backgroundTask 在页面静默后是否继续执行定时器
   */
  static run(e = a.TIMEOUT, A, i) {
    e === a.INTERVAL ? i = { delay: 2e3, count: 0, backgroundTask: !0, ...i } : i = { delay: 2e3, count: 0, backgroundTask: !0, ...i }, ke(A) && (i = { ...i, ...A }), Xe(e) && (A = e, e = a.TIMEOUT);
    const s = {
      taskID: this.generateTaskID(),
      loopCount: 0,
      intervalID: null,
      timeoutID: null,
      taskName: e,
      callback: A,
      ...i
    };
    return this.taskMap.set(s.taskID, s), e === a.INTERNAL ? this.interval(s) : this.timeout(s), s.taskID;
  }
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
  static interval(e) {
    const A = () => {
      e.callback(), e.loopCount += 1, this.isBreakLoop(e);
    };
    return e.intervalID = setInterval(A, e.delay);
  }
  /**
   * 延迟执行回调
   * count = 0,循环
   * count = n, 执行n次
   * @param {object} taskItem
   *
   */
  static timeout(e) {
    const A = () => {
      if (e.callback(), e.loopCount += 1, !this.isBreakLoop(e))
        return e.timeoutID = setTimeout(A, e.delay);
    };
    return e.timeoutID = setTimeout(A, e.delay);
  }
  static hasTask(e) {
    return this.taskMap.has(e);
  }
  static clearTask(e) {
    if (!this.taskMap.has(e))
      return !0;
    const { intervalID: A, timeoutID: i, onVisibilitychange: s } = this.taskMap.get(e);
    return A && clearInterval(A), i && clearTimeout(i), s && document.removeEventListener("visibilitychange", s), this.taskMap.delete(e), !0;
  }
  /**
   * 1. 如果已移除出定时队列，退出当前任务
   * 2. 如果当前任务已满足次数限制，则退出当前任务
   * @param {object} taskItem
   * @returns
   */
  static isBreakLoop(e) {
    return this.taskMap.has(e.taskID) ? e.count !== 0 && e.loopCount >= e.count ? (this.clearTask(e.taskID), !0) : !1 : !0;
  }
}
W.taskMap = /* @__PURE__ */ new Map();
W.currentTaskID = 1;
class ot {
  constructor() {
    this.defaultStore = {
      callStatus: u.IDLE,
      callRole: p.UNKNOWN,
      callMediaType: I.UNKNOWN,
      localUserInfo: { userId: "" },
      localUserInfoExcludeVolume: { userId: "" },
      remoteUserInfoList: [],
      remoteUserInfoExcludeVolumeList: [],
      callerUserInfo: { userId: "" },
      isGroup: !1,
      callDuration: "00:00:00",
      // 通话时长
      callTips: "",
      // 通话提示的信息. 例如: '等待谁接听', 'xxx 拒绝通话', 'xxx 挂断通话'
      toastInfo: { text: "" },
      // 远端用户挂断、拒绝、超时、忙线等的 toast 提示信息
      isMinimized: !1,
      // 用来记录当前是否悬浮窗模式
      enableFloatWindow: !1,
      // 开启/关闭悬浮窗功能，设置为false，通话界面左上角的悬浮窗按钮会隐藏
      bigScreenUserId: "",
      // 当前大屏幕显示的 userID 用户
      language: Ze(),
      // en, zh-cn
      isClickable: !1,
      // 是否可点击, 用于按钮增加 loading 效果，不可点击
      deviceList: { cameraList: [], microphoneList: [], currentCamera: {}, currentMicrophone: {} },
      showPermissionTip: !1,
      groupID: "",
      roomID: 0,
      cameraPosition: Y.FRONT,
      // 前置或后置，值为front, back
      // TUICallKit 组件上的属性
      displayMode: V.COVER,
      // 设置预览远端的画面显示模式
      videoResolution: b.RESOLUTION_480P,
      showSelectUser: !1,
      // 小程序相关属性
      pusher: {},
      player: [],
      isEarPhone: !1
      // 是否是听筒, 默认: false
    }, this.store = Object.assign({}, this.defaultStore);
  }
  update(e, A) {
    switch (e) {
      default:
        this.store[e] = A;
    }
  }
  getData(e) {
    return e ? this.store[e] : this.store;
  }
  // reset call store
  reset(e = []) {
    e.length === 0 && (e = Object.keys(this.store));
    const A = e.reduce((i, s) => ({ ...i, [s]: this.defaultStore[s] }), {});
    this.store = {
      ...this.defaultStore,
      ...this.store,
      ...A
    };
  }
}
let nt = class v {
  constructor() {
    this.timerId = -1, this.storeMap = {
      [o.CALL]: new ot()
    }, this.task = {};
  }
  /**
   * 获取 TUIStore 实例
   * @returns {TUIStore}
  */
  static getInstance() {
    return v.instance || (v.instance = new v()), v.instance;
  }
  /**
   * UI 组件注册监听回调
   * @param {StoreName} storeName store 名称
   * @param {IOptions} options 监听信息
   * @param {Object} params 扩展参数
   * @param {String} params.notifyRangeWhenWatch 注册时监听时的通知范围, 'all' - 通知所有注册该 key 的监听; 'myself' - 通知本次注册该 key 的监听; 默认不通知
  */
  watch(e, A, i) {
    this.task[e] || (this.task[e] = {});
    const s = this.task[e];
    Object.keys(A).forEach((n) => {
      const r = A[n];
      s[n] || (s[n] = /* @__PURE__ */ new Map()), s[n].set(r, 1);
      const { notifyRangeWhenWatch: C } = i || {};
      if (C === a.ALL && this.notify(e, n), C === a.MYSELF) {
        const d = this.getData(e, n);
        r.call(this, d);
      }
    });
  }
  /**
   * UI 取消组件监听回调
   * @param {StoreName} storeName store 名称
   * @param {IOptions} options 监听信息,包含需要取消的回掉等
   */
  unwatch(e, A) {
    if (!this.task[e])
      return;
    const i = this.task[e];
    Object.keys(A).forEach((s) => {
      i[s].delete(A[s]);
    });
  }
  /**
   * 通用 store 数据更新，messageList 的变更需要单独处理
   * @param {StoreName} storeName store 名称
   * @param {string} key 变更的 key
   * @param {unknown} data 变更的数据
  */
  update(e, A, i) {
    var s;
    (Z(i) || Ue(i) || We(i)) && this.storeMap[e].store[A] === i || ((s = this.storeMap[e]) == null || s.update(A, i), this.notify(e, A));
  }
  /**
   * 获取 Store 数据
   * @param {StoreName} storeName store 名称
   * @param {string} key 待获取的 key
   * @returns {Any}
  */
  getData(e, A) {
    var i;
    return (i = this.storeMap[e]) == null ? void 0 : i.getData(A);
  }
  /**
   * UI 组件注册监听回调
   * @param {StoreName} storeName store 名称
   * @param {string} key 变更的 key
  */
  notify(e, A) {
    if (!this.task[e])
      return;
    const i = this.task[e];
    if (i[A]) {
      const s = i[A], n = this.getData(e, A);
      for (const [r] of s.entries())
        r.call(this, n);
    }
  }
  reset(e, A = [], i = !1) {
    if (e in this.storeMap) {
      const s = this.storeMap[e];
      A.length === 0 && (A = Object.keys(s == null ? void 0 : s.store)), s.reset(A), i && A.forEach((n) => {
        this.notify(e, n);
      });
    }
  }
  // 批量修改多个 key-value
  updateStore(e, A) {
    const i = A || o.CALL;
    Object.keys(e).forEach((s) => {
      this.update(i, s, e[s]);
    });
  }
};
var rt = Object.defineProperty, ct = Object.getOwnPropertyDescriptor, h = (t, e, A, i) => {
  for (var s = i > 1 ? void 0 : i ? ct(e, A) : e, n = t.length - 1, r; n >= 0; n--)
    (r = t[n]) && (s = (i ? r(e, A, s) : r(s)) || s);
  return i && s && rt(e, A, s), s;
};
const It = pe.getInstance(), l = nt.getInstance(), Le = "3.2.1", K = class {
  constructor() {
    this._tim = null, this._TUICore = null, this._timerId = -1, this._startTimeStamp = X(), this._bellContext = null, this._defaultOfflinePushInfo = {
      title: "",
      description: T("you have a new call")
    }, this._handleCallStatusChange = async (t) => {
      var e, A;
      try {
        const i = {
          callRole: l.getData(o.CALL, a.CALL_ROLE),
          callStatus: l.getData(o.CALL, a.CALL_STATUS)
        };
        if (this._bellContext.setBellProperties(i), t === u.CALLING)
          await ((e = this == null ? void 0 : this._bellContext) == null ? void 0 : e.play());
        else {
          if (t === u.CONNECTED) {
            const s = l.getData(o.CALL, a.IS_GROUP), n = l.getData(o.CALL, a.CALL_MEDIA_TYPE), r = l.getData(o.CALL, a.REMOTE_USER_INFO_LIST), C = s ? _.DIALING_GROUP : _.DIALING_C2C;
            l.update(o.CALL, a.CALL_TIPS, ""), this.statusChanged && this.statusChanged({ oldStatus: C, newStatus: J(l) }), !s && n === I.VIDEO && this.switchScreen(r[0].domId);
          }
          await ((A = this == null ? void 0 : this._bellContext) == null ? void 0 : A.stop());
        }
      } catch (i) {
        console.warn(`${a.PREFIX}handleCallStatusChange, ${i}.`);
      }
    }, console.log(`${a.PREFIX}version: ${Le}`), this._watchTUIStore(), this._bellContext = new at(), H.registerEvent(O.TUILogin.EVENT.LOGIN_STATE_CHANGED, O.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS, this), H.registerService(O.TUICalling.SERVICE.NAME, this), H.registerExtension(O.TUIChat.EXTENSION.INPUT_MORE.EXT_ID, this);
  }
  static getInstance() {
    return K.instance || (K.instance = new K()), K.instance;
  }
  async init(t) {
    try {
      if (this._tuiCallEngine)
        return;
      let { userID: e, tim: A, userSig: i, sdkAppID: s, SDKAppID: n, isFromChat: r } = t;
      this._TUICore && (s = this._TUICore.SDKAppID, A = this._TUICore.tim), this._tim = A, console.log(`${a.PREFIX}init sdkAppId: ${s || n}, userId: ${e}`), this._tuiCallEngine = Ne.createInstance({
        tim: A,
        // @ts-ignore
        sdkAppID: s || n,
        // 兼容传入 SDKAppID 的问题
        callkitVersion: Le,
        chat: r || !1
      }), this._addListenTuiCallEngineEvent(), l.update(o.CALL, a.LOCAL_USER_INFO, { userId: e }), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { userId: e }), await this._tuiCallEngine.login({ userID: e, userSig: i, assetsPath: "" });
    } catch (e) {
      throw console.error(`${a.PREFIX}init failed, error: ${e}.`), e;
    }
  }
  // component destroy
  async destroyed() {
    try {
      const t = l.getData(o.CALL, a.CALL_STATUS);
      if (t !== u.IDLE)
        throw new Error(`please destroyed when status is idle, current status: ${t}`);
      this._tuiCallEngine && (this._removeListenTuiCallEngineEvent(), await this._tuiCallEngine.destroyInstance(), this._tuiCallEngine = null);
    } catch (t) {
      throw console.error(`${a.PREFIX}destroyed failed, error: ${t}.`), t;
    }
  }
  async call(t) {
    try {
      const { type: e, userID: A, offlinePushInfo: i } = t;
      if (l.getData(o.CALL, a.CALL_STATUS) !== u.IDLE)
        return;
      await this._updateCallStoreBeforeCall(e, [{ userId: A }]), this._executeExternalBeforeCalling(), t.offlinePushInfo = { ...this._defaultOfflinePushInfo, ...i };
      const s = await this._tuiCallEngine.call(t);
      await this._updateCallStoreAfterCall([A], s);
    } catch (e) {
      this._handleCallError(e, "call");
    }
  }
  async groupCall(t) {
    try {
      const { userIDList: e, type: A, groupID: i, offlinePushInfo: s } = t;
      if (l.getData(o.CALL, a.CALL_STATUS) !== u.IDLE)
        return;
      const n = e.map((C) => ({ userId: C }));
      await this._updateCallStoreBeforeCall(A, n, i), this._executeExternalBeforeCalling(), t.offlinePushInfo = { ...this._defaultOfflinePushInfo, ...s };
      const r = await this._tuiCallEngine.groupCall(t);
      await this._updateCallStoreAfterCall(e, r);
    } catch (e) {
      this._handleCallError(e, "groupCall");
    }
  }
  async inviteUser(t) {
    try {
      const { userIDList: e } = t;
      let A = await x(e, this.getTim(), l);
      const i = l.getData(o.CALL, a.REMOTE_USER_INFO_LIST);
      l.update(o.CALL, a.REMOTE_USER_INFO_LIST, [...i, ...A]), l.update(o.CALL, a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, [...i, ...A]), this._tuiCallEngine && await this._tuiCallEngine.inviteUser(t);
    } catch (e) {
      throw console.error(`${a.PREFIX}inviteUser failed, error: ${e}.`), this._resetCallStore(), e;
    }
  }
  async joinInGroupCall(t) {
    try {
      const e = {
        [a.CALL_ROLE]: p.CALLEE,
        [a.IS_GROUP]: !0,
        [a.CALL_STATUS]: u.CONNECTED,
        [a.CALL_MEDIA_TYPE]: t.type,
        [a.GROUP_ID]: t.groupID,
        [a.ROOM_ID]: t.roomID
      };
      l.updateStore(e, o.CALL);
      const A = await this._tuiCallEngine.joinInGroupCall(t);
      t.type === I.VIDEO && await this.openCamera(a.LOCAL_VIDEO), l.update(o.CALL, a.IS_CLICKABLE, !0), this._startTimer(), l.update(o.CALL, a.PUSHER, A), this.setSoundMode(t.type === I.AUDIO ? U.EAR : U.SPEAKER);
      const i = l.getData(o.CALL, a.LOCAL_USER_INFO);
      l.update(o.CALL, a.LOCAL_USER_INFO, { ...i, isEnter: !0 }), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { ...i, isEnter: !0 }), this._setLocalUserInfoAudioVideoAvailable(!0, a.AUDIO);
    } catch (e) {
      throw console.error(`${a.PREFIX}joinInGroupCall failed, error: ${e}.`), this._resetCallStore(), e;
    }
  }
  // ===============================【其它对外接口】===============================
  getTUICallEngineInstance() {
    return (this == null ? void 0 : this._tuiCallEngine) || null;
  }
  setLogLevel(t) {
    var e;
    (e = this == null ? void 0 : this._tuiCallEngine) == null || e.setLogLevel(t);
  }
  setLanguage(t) {
    t && Object.values(he).includes(t) && l.update(o.CALL, a.LANGUAGE, t);
  }
  enableFloatWindow(t) {
    l.update(o.CALL, a.ENABLE_FLOAT_WINDOW, t);
  }
  async setSelfInfo(t) {
    const { nickName: e, avatar: A } = t;
    try {
      await this._tuiCallEngine.setSelfInfo(e, A);
    } catch (i) {
      console.error(`${a.PREFIX}setSelfInfo failed, error: ${i}.`);
    }
  }
  async setCallingBell(t) {
    const e = { calleeBellFilePath: t };
    this._bellContext.setBellProperties(e);
  }
  async enableMuteMode(t) {
    try {
      const e = { isMuteBell: t };
      this._bellContext.setBellProperties(e), await this._bellContext.setBellMute(t);
    } catch (e) {
      console.warn(`${a.PREFIX}enableMuteMode failed, error: ${e}.`);
    }
  }
  async accept() {
    var t;
    try {
      const e = await this._tuiCallEngine.accept();
      if (e) {
        l.update(o.CALL, a.CALL_STATUS, u.CONNECTED), this._callTUIService({ message: (t = e == null ? void 0 : e.data) == null ? void 0 : t.message }), l.update(o.CALL, a.IS_CLICKABLE, !0), this._startTimer();
        const A = l.getData(o.CALL, a.CALL_MEDIA_TYPE);
        A === I.VIDEO && await this.openCamera(a.LOCAL_VIDEO), e.pusher && l.update(o.CALL, a.PUSHER, e.pusher), this.setSoundMode(A === I.AUDIO ? U.EAR : U.SPEAKER);
        const i = l.getData(o.CALL, a.LOCAL_USER_INFO);
        l.update(o.CALL, a.LOCAL_USER_INFO, { ...i, isEnter: !0 }), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { ...i, isEnter: !0 }), this._setLocalUserInfoAudioVideoAvailable(!0, a.AUDIO);
      }
    } catch (e) {
      if (Ce(e))
        return;
      this._noDevicePermissionToast(e, I.AUDIO), this._resetCallStore();
    }
  }
  async hangup() {
    try {
      const t = await this._tuiCallEngine.hangup();
      t == null || t.forEach((e) => {
        var A;
        (e == null ? void 0 : e.code) === 0 && this._callTUIService({ message: (A = e == null ? void 0 : e.data) == null ? void 0 : A.message });
      });
    } catch (t) {
      console.debug(t);
    }
    this._resetCallStore();
  }
  async reject() {
    var t;
    try {
      const e = await this._tuiCallEngine.reject();
      (e == null ? void 0 : e.code) === 0 && this._callTUIService({ message: (t = e == null ? void 0 : e.data) == null ? void 0 : t.message });
    } catch (e) {
      console.debug(e);
    }
    this._resetCallStore();
  }
  async openCamera(t) {
    try {
      await this._tuiCallEngine.openCamera(), this._setLocalUserInfoAudioVideoAvailable(!0, a.VIDEO);
    } catch (e) {
      this._noDevicePermissionToast(e, I.VIDEO), console.error(`${a.PREFIX}openCamera error: ${e}.`);
    }
  }
  async closeCamera() {
    try {
      await this._tuiCallEngine.closeCamera(), this._setLocalUserInfoAudioVideoAvailable(!1, a.VIDEO);
    } catch (t) {
      console.error(`${a.PREFIX}closeCamera error: ${t}.`);
    }
  }
  async openMicrophone() {
    try {
      await this._tuiCallEngine.openMicrophone(), this._setLocalUserInfoAudioVideoAvailable(!0, a.AUDIO);
    } catch (t) {
      console.error(`${a.PREFIX}openMicrophone failed, error: ${t}.`);
    }
  }
  async closeMicrophone() {
    try {
      await this._tuiCallEngine.closeMicrophone(), this._setLocalUserInfoAudioVideoAvailable(!1, a.AUDIO);
    } catch (t) {
      console.error(`${a.PREFIX}closeMicrophone failed, error: ${t}.`);
    }
  }
  switchScreen(t) {
    t && l.update(o.CALL, a.BIG_SCREEN_USER_ID, t);
  }
  async switchCallMediaType() {
    var t;
    try {
      const e = l.getData(o.CALL, a.CALL_MEDIA_TYPE);
      if (e === I.AUDIO) {
        console.warn(`${a.PREFIX}switchCallMediaType failed, ${e} not support.`);
        return;
      }
      const A = await this._tuiCallEngine.switchCallMediaType(I.AUDIO);
      (A == null ? void 0 : A.code) === 0 && this._callTUIService({ message: (t = A == null ? void 0 : A.data) == null ? void 0 : t.message }), l.update(o.CALL, a.CALL_MEDIA_TYPE, I.AUDIO);
      const s = l.getData(o.CALL, a.IS_GROUP) ? _.CALLING_GROUP_VIDEO : _.CALLING_C2C_VIDEO, n = J(l);
      this.statusChanged && this.statusChanged({ oldStatus: s, newStatus: n }), this.setSoundMode(U.EAR);
    } catch (e) {
      console.error(`${a.PREFIX}switchCallMediaType failed, error: ${e}.`);
    }
  }
  async switchCamera() {
    const e = l.getData(o.CALL, a.CAMERA_POSITION) === Y.BACK ? Y.FRONT : Y.BACK;
    try {
      await this._tuiCallEngine.switchCamera(e), l.update(o.CALL, a.CAMERA_POSITION, e);
    } catch (A) {
      console.error(`${a.PREFIX}_switchCamera failed, error: ${A}.`);
    }
  }
  setSoundMode(t) {
    var e;
    try {
      let A = l.getData(o.CALL, a.IS_EAR_PHONE);
      const i = t || (A ? U.SPEAKER : U.EAR);
      (e = this._tuiCallEngine) == null || e.selectAudioPlaybackDevice(i), t ? A = t === U.EAR : A = !A, l.update(o.CALL, a.IS_EAR_PHONE, A);
    } catch (A) {
      console.error(`${a.PREFIX}setSoundMode failed, error: ${A}.`);
    }
  }
  // 切前后置 miniProgram, 切扬声器
  getTim() {
    var t, e;
    return this._tim ? this._tim : this._tuiCallEngine ? ((t = this._tuiCallEngine) == null ? void 0 : t.tim) || ((e = this._tuiCallEngine) == null ? void 0 : e.getTim()) : (console.warn(`${a.PREFIX}getTim warning: _tuiCallEngine Instance is not available.`), null);
  }
  // ==========================【TUICallEngine 事件处理】==========================
  _addListenTuiCallEngineEvent() {
    if (!this._tuiCallEngine) {
      console.warn(`${a.PREFIX}add engine event listener failed, engine is empty.`);
      return;
    }
    this._tuiCallEngine.on(c.ERROR, this._handleError, this), this._tuiCallEngine.on(c.INVITED, this._handleNewInvitationReceived, this), this._tuiCallEngine.on(c.USER_ACCEPT, this._handleUserAccept, this), this._tuiCallEngine.on(c.USER_ENTER, this._handleUserEnter, this), this._tuiCallEngine.on(c.USER_LEAVE, this._handleUserLeave, this), this._tuiCallEngine.on(c.REJECT, this._handleInviteeReject, this), this._tuiCallEngine.on(c.NO_RESP, this._handleNoResponse, this), this._tuiCallEngine.on(c.LINE_BUSY, this._handleLineBusy, this), this._tuiCallEngine.on(c.CALLING_CANCEL, this._handleCallingCancel, this), this._tuiCallEngine.on(c.SDK_READY, this._handleSDKReady, this), this._tuiCallEngine.on(c.KICKED_OUT, this._handleKickedOut, this), this._tuiCallEngine.on(c.MESSAGE_SENT_BY_ME, this._messageSentByMe, this), this._tuiCallEngine.on(c.CALL_END, this._handleCallingEnd, this), this._tuiCallEngine.on(c.CALL_MODE, this._handleCallTypeChange, this), this._tuiCallEngine.on(c.USER_UPDATE, this._handleUserUpdate, this);
  }
  _removeListenTuiCallEngineEvent() {
    this._tuiCallEngine.off(c.ERROR, this._handleError), this._tuiCallEngine.off(c.INVITED, this._handleNewInvitationReceived), this._tuiCallEngine.off(c.USER_ACCEPT, this._handleUserAccept), this._tuiCallEngine.off(c.USER_ENTER, this._handleUserEnter), this._tuiCallEngine.off(c.USER_LEAVE, this._handleUserLeave), this._tuiCallEngine.off(c.REJECT, this._handleInviteeReject), this._tuiCallEngine.off(c.NO_RESP, this._handleNoResponse), this._tuiCallEngine.off(c.LINE_BUSY, this._handleLineBusy), this._tuiCallEngine.off(c.CALLING_CANCEL, this._handleCallingCancel), this._tuiCallEngine.off(c.SDK_READY, this._handleSDKReady), this._tuiCallEngine.off(c.KICKED_OUT, this._handleKickedOut), this._tuiCallEngine.off(c.MESSAGE_SENT_BY_ME, this._messageSentByMe), this._tuiCallEngine.off(c.CALL_END, this._handleCallingEnd), this._tuiCallEngine.off(c.CALL_MODE, this._handleCallTypeChange), this._tuiCallEngine.off(c.USER_UPDATE, this._handleUserUpdate);
  }
  _handleError(t) {
    const { code: e, message: A } = t || {}, i = Object.values(ne).indexOf(e);
    let s = "";
    if (i !== -1) {
      const n = Object.keys(ne)[i];
      s = T(Ge[n]), s && l.update(o.CALL, a.TOAST_INFO, { text: s, type: a.ERROR });
    }
    this._executeExternalAfterCalling(), console.error(`${a.PREFIX}_handleError, errorCode: ${e}; errorMessage: ${s || A}.`);
  }
  async _handleNewInvitationReceived(t) {
    console.log(`${a.PREFIX}onCallReceived event data: ${JSON.stringify(t)}.`);
    const { sponsor: e = "", isFromGroup: A, callMediaType: i, inviteData: s = {}, calleeIdList: n = [], groupID: r = "" } = this._analyzeEventData(t), C = l.getData(o.CALL, a.LOCAL_USER_INFO), d = [e, ...n.filter((M) => M !== C.userId)], E = i || s.callType, S = E === I.AUDIO ? B.CALLEE_CALLING_AUDIO_MSG : B.CALLEE_CALLING_VIDEO_MSG;
    let g = {
      [a.CALL_ROLE]: p.CALLEE,
      [a.IS_GROUP]: A,
      [a.CALL_STATUS]: u.CALLING,
      [a.CALL_MEDIA_TYPE]: E,
      [a.CALL_TIPS]: T(S),
      [a.CALLER_USER_INFO]: { userId: e },
      [a.GROUP_ID]: r
    };
    de();
    const Q = { enableCamera: E === I.VIDEO, enableMic: !0 };
    g = { ...g, [a.PUSHER]: Q }, l.updateStore(g, o.CALL), this._executeExternalBeforeCalling(), this.statusChanged && this.statusChanged({ oldStatus: _.IDLE, newStatus: _.BE_INVITED });
    const N = await x(d, this.getTim(), l), [D] = N.filter((M) => M.userId === e);
    N.length > 0 && l.updateStore({
      [a.REMOTE_USER_INFO_LIST]: N,
      [a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: N,
      [a.CALLER_USER_INFO]: {
        userId: e,
        nick: (D == null ? void 0 : D.nick) || "",
        avatar: (D == null ? void 0 : D.avatar) || "",
        displayUserInfo: (D == null ? void 0 : D.remark) || (D == null ? void 0 : D.nick) || e
      }
    }, o.CALL);
  }
  _handleUserAccept(t) {
    this._callerChangeToConnected(), l.update(o.CALL, a.TOAST_INFO, T("answered")), console.log(`${a.PREFIX}accept event data: ${JSON.stringify(t)}.`);
  }
  async _handleUserEnter(t) {
    this._callerChangeToConnected();
    const { userID: e, data: A } = this._analyzeEventData(t);
    A != null && A.playerList && l.update(o.CALL, a.PLAYER, A.playerList);
    let i = l.getData(o.CALL, a.REMOTE_USER_INFO_LIST);
    if (!i.find((n) => (n == null ? void 0 : n.userId) === e)) {
      i.push({ userId: e }), i.length > 0 && (l.update(o.CALL, a.REMOTE_USER_INFO_LIST, i), l.update(o.CALL, a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, i));
      const [n] = await x([e], this.getTim(), l);
      i = l.getData(o.CALL, a.REMOTE_USER_INFO_LIST), i.forEach((r) => {
        (r == null ? void 0 : r.userId) === e && (r = Object.assign(r, n));
      });
    }
    i = i.map((n) => (n.userId === e && (n.isEnter = !0), n)), i.length > 0 && (l.update(o.CALL, a.REMOTE_USER_INFO_LIST, i), l.update(o.CALL, a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, i)), console.log(`${a.PREFIX}userEnter event data: ${JSON.stringify(t)}.`);
  }
  _callerChangeToConnected() {
    const t = l.getData(o.CALL, a.CALL_ROLE);
    l.getData(o.CALL, a.CALL_STATUS) === u.CALLING && t === p.CALLER && (l.update(o.CALL, a.CALL_STATUS, u.CONNECTED), this._startTimer());
  }
  _handleUserLeave(t) {
    console.log(`${a.PREFIX}userLeave event data: ${JSON.stringify(t)}.`);
    const { data: e, userID: A } = this._analyzeEventData(t);
    if (e != null && e.playerList && l.update(o.CALL, a.PLAYER, e.playerList), l.getData(o.CALL, a.IS_GROUP)) {
      const s = (l.getData(o.CALL, a.REMOTE_USER_INFO_LIST).find((r) => r.userId === A) || {}).displayUserInfo || A, n = G(l, B.END_CALL, s);
      l.update(o.CALL, a.TOAST_INFO, { text: n });
    }
    A && this._deleteRemoteUser([A]);
  }
  _unNormalEventsManager(t, e) {
    console.log(`${a.PREFIX}${e} event data: ${JSON.stringify(t)}.`);
    const A = l.getData(o.CALL, a.IS_GROUP), i = l.getData(o.CALL, a.REMOTE_USER_INFO_LIST);
    switch (e) {
      case c.REJECT:
      case c.LINE_BUSY: {
        const { userID: s } = this._analyzeEventData(t);
        let n = e === c.REJECT ? B.OTHER_SIDE_REJECT_CALL : B.OTHER_SIDE_LINE_BUSY, r = G(l, n);
        if (A) {
          const C = (i.find((d) => d.userId === s) || {}).displayUserInfo || s;
          n = e === c.REJECT ? B.REJECT_CALL : B.IN_BUSY, r = G(l, n, C);
        }
        l.update(o.CALL, a.TOAST_INFO, { text: r }), s && this._deleteRemoteUser([s]);
        break;
      }
      case c.NO_RESP: {
        const { userIDList: s = [] } = this._analyzeEventData(t), n = A ? B.TIMEOUT : B.CALL_TIMEOUT, r = s.map((d) => (i.find((S) => S.userId === d) || {}).displayUserInfo || d), C = A ? G(l, n, r.join()) : G(l, n);
        l.update(o.CALL, a.TOAST_INFO, { text: C }), s.length > 0 && this._deleteRemoteUser(s);
        break;
      }
      case c.CALLING_CANCEL: {
        this._resetCallStore();
        break;
      }
    }
  }
  _handleInviteeReject(t) {
    this._unNormalEventsManager(t, c.REJECT);
  }
  _handleNoResponse(t) {
    this._unNormalEventsManager(t, c.NO_RESP);
  }
  _handleLineBusy(t) {
    this._unNormalEventsManager(t, c.LINE_BUSY);
  }
  _handleCallingCancel(t) {
    this._executeExternalAfterCalling(), this._unNormalEventsManager(t, c.CALLING_CANCEL);
  }
  _handleCallingEnd(t) {
    console.log(`${a.PREFIX}callEnd event data: ${JSON.stringify(t)}.`), this._executeExternalAfterCalling(), this._resetCallStore();
  }
  // SDK_READY 后才能调用 tim 接口, 否则登录后立刻获取导致调用接口失败. v2.27.4+、v3 接口 login 后会抛出 SDK_READY
  async _handleSDKReady(t) {
    let e = l.getData(o.CALL, a.LOCAL_USER_INFO);
    e = await it(e.userId, this.getTim(), l), this._defaultOfflinePushInfo.title = e == null ? void 0 : e.displayUserInfo, l.update(o.CALL, a.LOCAL_USER_INFO, e), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, e);
  }
  _handleKickedOut(t) {
    console.log(`${a.PREFIX}kickOut event data: ${JSON.stringify(t)}.`), this.kickedOut && this.kickedOut(t), l.update(o.CALL, a.CALL_TIPS, G(l, B.KICK_OUT)), this._resetCallStore();
  }
  _handleCallTypeChange(t) {
    const { newCallType: e, type: A } = this._analyzeEventData(t);
    l.update(o.CALL, a.CALL_MEDIA_TYPE, e || A), this.setSoundMode(U.EAR);
  }
  _messageSentByMe(t) {
    const e = t == null ? void 0 : t.data;
    this.onMessageSentByMe && this.onMessageSentByMe(e);
  }
  // ==========================【 miniProgram 私有事件】==========================
  _handleUserUpdate(t) {
    const e = this._analyzeEventData(t);
    e != null && e.pusher && l.update(o.CALL, a.PUSHER, e.pusher), e != null && e.playerList && l.update(o.CALL, a.PLAYER, e.playerList);
  }
  // 处理 “呼叫” 抛出的异常
  _handleCallError(t, e) {
    if (!Ce(t))
      throw Ke(t), this._noDevicePermissionToast(t, I.AUDIO), console.error(`${a.PREFIX}${e} failed, error: ${t}.`), this._resetCallStore(), t;
  }
  setCallback(t) {
    const { beforeCalling: e, afterCalling: A, onMinimized: i, onMessageSentByMe: s, kickedOut: n, statusChanged: r } = t;
    e && (this.beforeCalling = e), A && (this.afterCalling = A), i && (this.onMinimized = i), s && (this.onMessageSentByMe = s), n && (this.kickedOut = n), r && (this.statusChanged = r);
  }
  toggleMinimize() {
    const t = l.getData(o.CALL, a.IS_MINIMIZED);
    l.update(o.CALL, a.IS_MINIMIZED, !t), console.log(`${a.PREFIX}toggleMinimize: ${t} -> ${!t}.`), this.onMinimized && this.onMinimized(t, !t);
  }
  _executeExternalBeforeCalling() {
    this.beforeCalling && this.beforeCalling();
  }
  _executeExternalAfterCalling() {
    this.afterCalling && this.afterCalling();
  }
  setVideoDisplayMode(t) {
    l.update(o.CALL, a.DISPLAY_MODE, t);
  }
  async setVideoResolution(t) {
    try {
      if (!t)
        return;
      l.update(o.CALL, a.VIDEO_RESOLUTION, t), await this._tuiCallEngine.setVideoQuality(t);
    } catch (e) {
      console.warn(`${a.PREFIX}setVideoResolution failed, error: ${e}.`);
    }
  }
  // =========================【 miniProgram 私有公共方法】=========================
  // 处理用户异常退出的情况，处理了右滑退出，以及返回退出的情况。
  async _handleExceptionExit() {
    const t = l.getData(o.CALL, a.CALL_STATUS), e = l.getData(o.CALL, a.CALL_ROLE);
    t === u.CALLING && (e === p.CALLER && await this.hangup(), e === p.CALLEE && await this.reject()), t === u.CONNECTED && await this.hangup();
  }
  _setLocalUserInfoAudioVideoAvailable(t, e) {
    let A = l.getData(o.CALL, a.LOCAL_USER_INFO);
    e === a.AUDIO && (A = { ...A, isAudioAvailable: t }), e === a.VIDEO && (A = { ...A, isVideoAvailable: t }), l.update(o.CALL, a.LOCAL_USER_INFO, A), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, A);
  }
  async _updateCallStoreBeforeCall(t, e, A) {
    const i = A || l.getData(o.CALL, a.IS_MINIMIZED) ? B.CALLER_GROUP_CALLING_MSG : B.CALLER_CALLING_MSG;
    let s = {
      [a.CALL_MEDIA_TYPE]: t,
      [a.CALL_ROLE]: p.CALLER,
      [a.REMOTE_USER_INFO_LIST]: e,
      [a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST]: e,
      [a.IS_GROUP]: !!A,
      [a.CALL_TIPS]: T(i),
      [a.GROUP_ID]: A
    };
    const n = { enableCamera: t === I.VIDEO, enableMic: !0 };
    s = { ...s, [a.PUSHER]: n }, l.updateStore(s, o.CALL);
    const r = await ve(t, this);
    console.log(`${a.PREFIX}mini beforeCall return callStatus: ${r}.`), l.update(o.CALL, a.CALL_STATUS, r);
    const C = await x(e.map((d) => d.userId), this.getTim(), l);
    C.length > 0 && (l.update(o.CALL, a.REMOTE_USER_INFO_LIST, C), l.update(o.CALL, a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, C));
  }
  async _updateCallStoreAfterCall(t, e) {
    var A;
    if (e) {
      l.update(o.CALL, a.IS_CLICKABLE, !0), l.update(o.CALL, a.ROOM_ID, e.roomID), this._callTUIService({ message: (A = e == null ? void 0 : e.data) == null ? void 0 : A.message }), e.pusher && l.update(o.CALL, a.PUSHER, e.pusher);
      const i = l.getData(o.CALL, a.CALL_MEDIA_TYPE);
      i === I.VIDEO && await this.openCamera(a.LOCAL_VIDEO), this.setSoundMode(i === I.AUDIO ? U.EAR : U.SPEAKER), l.update(o.CALL, a.CALL_STATUS, u.CALLING);
      const s = l.getData(o.CALL, a.LOCAL_USER_INFO);
      l.update(o.CALL, a.LOCAL_USER_INFO, { ...s, isEnter: !0 }), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, { ...s, isEnter: !0 }), this._setLocalUserInfoAudioVideoAvailable(!0, a.AUDIO);
    } else
      this._resetCallStore();
  }
  _resetCurrentDevice() {
    const { cameraList: t, microphoneList: e, speakerList: A } = l.getData(o.CALL, a.DEVICE_LIST);
    l.update(
      o.CALL,
      a.DEVICE_LIST,
      {
        microphoneList: e,
        cameraList: t,
        speakerList: A,
        currentCamera: (t == null ? void 0 : t[0]) || {},
        currentMicrophone: (e == null ? void 0 : e[0]) || {},
        currentSpeaker: (A == null ? void 0 : A[0]) || {}
      }
    );
  }
  _resetCallStore() {
    const t = J(l);
    this._stopTimer();
    let e = Object.keys(z).filter((s) => {
      switch (z[s]) {
        case a.CALL_STATUS:
        case a.LANGUAGE:
        case a.IS_GROUP:
        case a.DISPLAY_MODE:
        case a.VIDEO_RESOLUTION:
        case a.ENABLE_FLOAT_WINDOW:
        case a.LOCAL_USER_INFO:
        case a.LOCAL_USER_INFO_EXCLUDE_VOLUMN:
          return !1;
        default:
          return !0;
      }
    });
    e = e.map((s) => z[s]), l.reset(o.CALL, e), l.getData(o.CALL, a.CALL_STATUS) !== u.IDLE && l.reset(o.CALL, [a.CALL_STATUS], !0), l.reset(o.CALL, [a.IS_MINIMIZED], !0), l.reset(o.CALL, [a.IS_EAR_PHONE], !0), l.update(o.CALL, a.LOCAL_USER_INFO, {
      ...l.getData(o.CALL, a.LOCAL_USER_INFO),
      isVideoAvailable: !1,
      isAudioAvailable: !1
    }), l.update(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN, {
      ...l.getData(o.CALL, a.LOCAL_USER_INFO_EXCLUDE_VOLUMN),
      isVideoAvailable: !1,
      isAudioAvailable: !1
    }), l.update(o.CALL, a.REMOTE_USER_INFO_LIST, []), l.update(o.CALL, a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, []), this._resetCurrentDevice();
    const i = J(l);
    t !== i && this.statusChanged && this.statusChanged({ oldStatus: t, newStatus: i });
  }
  _noDevicePermissionToast(t, e) {
    if (qe(t)) {
      let A = "";
      e === I.AUDIO && (A = G(l, B.NO_MICROPHONE_DEVICE_PERMISSION)), e === I.VIDEO && (A = G(l, B.NO_CAMERA_DEVICE_PERMISSION)), A && l.update(o.CALL, a.TOAST_INFO, { text: A, type: a.ERROR }), console.error(`${a.PREFIX}call failed, error: ${t.message}.`);
    }
  }
  // 通话时长更新
  _startTimer() {
    this._timerId === -1 && (this._startTimeStamp = X(), this._timerId = W.run(a.TIMEOUT, this._updateCallDuration.bind(this), { delay: 1e3 }));
  }
  _updateCallDuration() {
    const t = Math.round((X() - this._startTimeStamp) / 1e3), e = je(t);
    l.update(o.CALL, a.CALL_DURATION, e);
  }
  _stopTimer() {
    this._timerId !== -1 && (W.clearTask(this._timerId), this._timerId = -1);
  }
  _deleteRemoteUser(t) {
    if (t.length === 0)
      return;
    let e = l.getData(o.CALL, a.REMOTE_USER_INFO_LIST);
    t.forEach((A) => {
      e = e.filter((i) => i.userId !== A);
    }), l.update(o.CALL, a.REMOTE_USER_INFO_LIST, e), l.update(o.CALL, a.REMOTE_USER_INFO_EXCLUDE_VOLUMN_LIST, e);
  }
  _analyzeEventData(t) {
    return (t == null ? void 0 : t.data) || {};
  }
  // =========================【调用 chat api】=========================
  // 获取群成员
  async getGroupMemberList(t, e) {
    const A = l.getData(o.CALL, a.GROUP_ID);
    return await lt(A, this.getTim(), t, e);
  }
  // 获取群信息
  async getGroupProfile() {
    const t = l.getData(o.CALL, a.GROUP_ID);
    return await st(t, this.getTim());
  }
  _watchTUIStore() {
    l == null || l.watch(o.CALL, {
      [a.CALL_STATUS]: this._handleCallStatusChange
    });
  }
  _unwatchTUIStore() {
    l == null || l.unwatch(o.CALL, {
      [a.CALL_STATUS]: this._handleCallStatusChange
    });
  }
  // =========================【web 融合 chat 提供的方法】=========================
  bindTUICore(t) {
    this._TUICore = t;
  }
  // 下面方法用于接入 TUICore
  _callTUIService(t) {
    const { message: e } = t || {};
    H.callService({
      serviceName: O.TUIChat.SERVICE.NAME,
      method: O.TUIChat.SERVICE.METHOD.UPDATE_MESSAGE_LIST,
      params: { message: e }
    });
  }
  async onNotifyEvent(t, e) {
    try {
      if (t === O.TUILogin.EVENT.LOGIN_STATE_CHANGED)
        if (e === O.TUILogin.EVENT_SUB_KEY.USER_LOGIN_SUCCESS) {
          const { chat: A, userID: i, userSig: s, SDKAppID: n } = Oe.getContext();
          await this.init({ tim: A, userID: i, userSig: s, sdkAppID: n, isFromChat: !0 });
        } else
          e === O.TUILogin.EVENT_SUB_KEY.USER_LOGOUT_SUCCESS && await this.destroyed();
    } catch (A) {
      console.error(`${a.PREFIX}TUICore onNotifyEvent failed, error: ${A}.`);
    }
  }
  async onCall(t, e) {
    t === O.TUICalling.SERVICE.METHOD.START_CALL && await this._handleTUICoreOnClick(e, e.type);
  }
  async _handleTUICoreOnClick(t, e) {
    try {
      const { groupID: A, userIDList: i = [], ...s } = t;
      A ? await this.groupCall({ groupID: A, userIDList: i, type: e, ...s }) : i.length === 1 && await this.call({ userID: i[0], type: e, ...s });
    } catch (A) {
      console.debug(A);
    }
  }
  onGetExtension(t, e) {
    if (t === O.TUIChat.EXTENSION.INPUT_MORE.EXT_ID) {
      const A = [], i = {
        weight: 1e3,
        text: "语音通话",
        icon: Fe,
        data: {
          name: "voiceCall"
        },
        listener: {
          onClicked: async (n) => await this._handleTUICoreOnClick(n, n.type || I.AUDIO)
          // 点击时发起通话
        }
      }, s = {
        weight: 900,
        text: "视频通话",
        icon: Qe,
        data: {
          name: "videoCall"
        },
        listener: {
          onClicked: async (n) => await this._handleTUICoreOnClick(n, n.type || I.VIDEO)
          // 点击时发起通话
        }
      };
      return e != null && e.filterVoice || A.push(i), e != null && e.filterVideo || A.push(s), A;
    }
  }
};
let L = K;
h([
  f(),
  w(R.init)
], L.prototype, "init", 1);
h([
  f(),
  w(R.call)
], L.prototype, "call", 1);
h([
  f(),
  w(R.groupCall)
], L.prototype, "groupCall", 1);
h([
  f(),
  w(R.inviteUser)
], L.prototype, "inviteUser", 1);
h([
  f(),
  w(R.joinInGroupCall)
], L.prototype, "joinInGroupCall", 1);
h([
  w(R.setLanguage)
], L.prototype, "setLanguage", 1);
h([
  w(R.enableFloatWindow)
], L.prototype, "enableFloatWindow", 1);
h([
  w(R.setSelfInfo)
], L.prototype, "setSelfInfo", 1);
h([
  w(R.setCallingBell)
], L.prototype, "setCallingBell", 1);
h([
  w(R.enableMuteMode)
], L.prototype, "enableMuteMode", 1);
h([
  f()
], L.prototype, "accept", 1);
h([
  f()
], L.prototype, "hangup", 1);
h([
  f()
], L.prototype, "reject", 1);
h([
  f()
], L.prototype, "openCamera", 1);
h([
  f()
], L.prototype, "closeCamera", 1);
h([
  f()
], L.prototype, "openMicrophone", 1);
h([
  f()
], L.prototype, "closeMicrophone", 1);
h([
  f()
], L.prototype, "switchScreen", 1);
h([
  f()
], L.prototype, "switchCallMediaType", 1);
h([
  f()
], L.prototype, "switchCamera", 1);
h([
  f()
], L.prototype, "setSoundMode", 1);
h([
  w(R.setVideoDisplayMode)
], L.prototype, "setVideoDisplayMode", 1);
h([
  w(R.setVideoResolution)
], L.prototype, "setVideoResolution", 1);
const ut = L.getInstance(), Lt = "3.2.1";
export {
  I as CallMediaType,
  p as CallRole,
  a as NAME,
  _ as STATUS,
  o as StoreName,
  ut as TUICallKitServer,
  It as TUIGlobal,
  l as TUIStore,
  Lt as Version,
  V as VideoDisplayMode,
  b as VideoResolution,
  T as t
};
