## 原生小程序如何安装crypto进行本地签名生成

1. npm安装

```bash
npm init
npm i crypto-js
```

2. 然后点击`微信开发者工具`->`工具`->`构建npm`

3. 在项目中引用

```js
const crypto = require('crypto-js');
const sha256 = (str) => {
	return crypto.SHA256(str).toString();
};

// ...write here
```
