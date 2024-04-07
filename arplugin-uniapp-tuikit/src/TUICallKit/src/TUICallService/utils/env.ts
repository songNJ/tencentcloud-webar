// eslint-disable-next-line
declare var wx: any;
// eslint-disable-next-line
declare var uni: any;
// eslint-disable-next-line
declare var window: any;

// 在 uniApp 框架下，打包 H5、ios app、android app 时存在 wx/qq/tt/swan/my 等变量会导致引入 web sdk 环境判断失效
// 小程序 getSystemInfoSync 返回的 fontSizeSetting 在 H5 和 app 中为 undefined，所以通过 fontSizeSetting 增强小程序环境判断
// wx 小程序
export const IN_WX_MINI_APP = (typeof wx !== 'undefined' && typeof wx.getSystemInfoSync === 'function' && Boolean(wx.getSystemInfoSync().fontSizeSetting));

// 用 uni-app 打包 native app，此时运行于 js core，无 window 等对象，此时调用 api 都得 uni.xxx，由于风格跟小程序类似，就归为 IN_MINI_APP 的一种
export const IN_UNI_NATIVE_APP = (typeof uni !== 'undefined' && typeof uni === 'undefined');

export const IN_MINI_APP = IN_WX_MINI_APP || IN_UNI_NATIVE_APP;

export const IN_UNI_APP = (typeof uni !== 'undefined');

// 在 uniApp 框架下，由于客户打包 ios app、android app 时 window 不一定存在，所以通过 !IN_MINI_APP 进行判断
// 非 uniApp 框架下，仍然通过 window 结合 IN_MINI_APP 进行判断，可兼容 Taro3.0+ 暴露 window 对象引起的 IN_BROWSER 判断失效问题
export const IN_BROWSER = (function () {
  if (typeof uni !== 'undefined') {
    return !IN_MINI_APP;
  }
  return (typeof window !== 'undefined') && !IN_MINI_APP;
}());

// 命名空间
export const APP_NAMESPACE = (function () {
  if (IN_WX_MINI_APP) {
    return wx;
  }
  if (IN_UNI_APP) {
    return uni;
  }
  return window;
}());

// eslint-disable-next-line no-mixed-operators
const USER_AGENT = IN_BROWSER && window && window.navigator && window.navigator.userAgent || '';
const IS_ANDROID = /Android/i.test(USER_AGENT);
const IS_WIN_PHONE = /(?:Windows Phone)/.test(USER_AGENT);
const IS_SYMBIAN = /(?:SymbianOS)/.test(USER_AGENT);
const IS_IOS = /iPad/i.test(USER_AGENT) || /iPhone/i.test(USER_AGENT) || /iPod/i.test(USER_AGENT);

export const IS_H5 = IS_ANDROID || IS_WIN_PHONE || IS_SYMBIAN || IS_IOS;

export const IS_PC = IN_BROWSER && !IS_H5;
export const IS_WIN = IS_PC && USER_AGENT.includes('Windows NT');
export const IS_MAC = IS_PC && USER_AGENT.includes('Mac');
