const LICENSE_KEY = '48bd7bd4c8e221eb150fd1bf7d5a0ea4';
const APP_ID = '1309122168';

function getSignature() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://service-8wkf8fy8-1258344699.gz.apigw.tencentcs.com/release/get-ar-sign',
      method: 'GET',
      success(res) {
        console.log('getSignature ok', res);
        resolve(res.data);
      },
      fail(e) {
        console.log('getSignature error', e);
      },
    });
  });
}

async function authFunc() {
  const { signature, timestamp } = await getSignature();
  return {
    signature,
    timestamp,
  };
}

module.exports = {
  LICENSE_KEY,
  APP_ID,
  authFunc,
};
