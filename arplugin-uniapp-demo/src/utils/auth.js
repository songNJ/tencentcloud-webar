// 鉴权参考：https://cloud.tencent.com/document/product/616/71364

const LICENSE_KEY = '<your license key>';
const APP_ID = '<your app id>';
// token放在前端有泄漏风险，建议按照文档说明，将签名服务放到后端
const TOKEN = '<your token>';

import { SHA256 } from 'crypto-js';

const sha256 = (str) => {
  return SHA256(str).toString();
};

const genSignature = function () {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = sha256(timestamp + TOKEN + APP_ID + timestamp).toUpperCase(); // 使用上面获取到的token和appid合成加密串返回
  return { signature, timestamp };
};

async function authFunc() {
  const { signature, timestamp } = genSignature();
  return {
    signature,
    timestamp,
  };
}

export default {
  LICENSE_KEY,
  APP_ID,
  authFunc,
};
