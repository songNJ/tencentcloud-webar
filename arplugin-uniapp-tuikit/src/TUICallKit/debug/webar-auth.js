import crypto from "crypto-js";
const LICENSE_KEY = "48bd7bd4c8e221eb150fd1bf7d5a0ea4";
const APP_ID = "1309122168";
const TOKEN = "1054493363136cf02c1ad7c54e3a9c76";

const sha256 = (str) => {
  return crypto.SHA256(str).toString();
};

// 此方法仅测试时使用，为防止 token 泄露，发布时请使用服务端加密，详见[腾讯云-腾讯特效 SDK 官网文档](https://cloud.tencent.com/document/product/616/71364)
function authFunc() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = sha256(
    timestamp + TOKEN + APP_ID + timestamp
  ).toUpperCase();
  return { signature, timestamp };
}

export { LICENSE_KEY, APP_ID, authFunc };
