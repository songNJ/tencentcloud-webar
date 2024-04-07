import { CallMediaType, CallStatus } from '../const/index';

export function initialUI() {
  // 收起键盘
  // @ts-ignore
  wx.hideKeyboard({
    complete: () => {},
  });
};
// 检测运行时环境, 当是微信开发者工具时, 提示用户需要手机调试
export function checkRunPlatform() {
  // @ts-ignore
  const systemInfo = wx.getSystemInfoSync();
  if (systemInfo.platform === 'devtools') {
    // 当前运行在微信开发者工具里
    // @ts-ignore
    wx.showModal({
      icon: 'none',
      title: '运行环境提醒',
      content: '微信开发者工具不支持原生推拉流组件(即 <live-pusher> 和 <live-player> 标签)，请使用真机调试或者扫码预览。',
      showCancel: false,
    });
  }
};
export function initAndCheckRunEnv() {
  initialUI(); // miniProgram 收起键盘, 隐藏 tabBar
  checkRunPlatform(); // miniProgram 检测运行时环境
}
export async function beforeCall(type: CallMediaType, that: any) {
  try {
    initAndCheckRunEnv();
    // 检查设备权限
    const deviceMap = {
      microphone: true,
      camera: type === CallMediaType.VIDEO,
    };
    const hasDevicePermission = await that._tuiCallEngine.deviceCheck(deviceMap); // miniProgram 检查设备权限
    return hasDevicePermission ? CallStatus.CALLING : CallStatus.IDLE;
  } catch (error) {
    console.debug(error);
    return CallStatus.IDLE;
  }
}
// 套餐问题提示, 小程序最低需要群组通话版, 1v1 通话版本使用 TRTC 就会报错
export function handlePackageError(error) {
  if (error?.code === -1002) {
    // @ts-ignore
    wx.showModal({
      icon: 'none',
      title: 'error',
      content: error?.message || '',
      showCancel: false,
    });
  }
}