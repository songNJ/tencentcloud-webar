# TUICallkit 组件接入说明
TUICallkit 是小程序音视频通话 UI 组件，通过编写几行代码，就可以为您的小程序应用添加音视频通话功能。

**低于 v3.0.4 版本，参考的 [readme](https://www.npmjs.com/package/@tencentcloud/call-uikit-wechat/v/1.4.4)。**

## 环境准备

- 微信 App iOS 最低版本要求：8.0.40
- 微信 App Android 最低版本要求：8.0.40
- 小程序基础库最低版本要求：2.10.0
- 由于小程序测试号不具备 live-pusher 和 live-player 的使用权限，请使用企业小程序账号申请相关权限进行开发
- 由于微信开发者工具不支持原生组件（即 live-pusher 和 live-player 标签），需要在真机上进行运行体验

## 特性
- ⚡️ 功能全面 —— 支持单人/多人/音频/视频通话、支持视频转音频通话、支持自由选择通话设备
- 🎨 灵活样式 —— 组件开源，可复用逻辑，自定义 UI 样式
- 🛠 优秀生态 —— 与 [TUIKit](https://cloud.tencent.com/document/product/269/79737) 协同使用，可以在 [TIM](https://cloud.tencent.com/document/product/269) 会话中直接发起音视频通话
- 🌍 跨平台 —— 支持 Android、iOS、Web、小程序、Flutter、UniApp 等 [多个开发平台](https://cloud.tencent.com/document/product/647/78742)
- ☁️ 低延迟 —— 腾讯云全球链路资源储备，保证国际链路端到端平均时延 < 300ms
- 🤙🏻 低卡顿 —— 抗丢包率超过 80%、抗网络抖动超过 1000ms，弱网环境仍顺畅稳定
- 🌈 高品质 —— 支持 720P、1080P 高清画质，70% 丢包率仍可正常视频


## 目录结构

```
TUICallkit
├─ debug                 // 用来本地测试时生成 userSig
├─ src                   // UI 组件源码
    ├─ Components        // 呼叫中 UI 组件
    └─ TUICallService    // UI 组件的逻辑
    └─ adapter-vue.ts    // 用来适配 vue2、vue3 的适配层
    └─ index.ts          // UI 组件逻辑的入口
├─ types                 
├─ package.json
├─ README.md
├─ tuicall-uikit-vue.es.js
├─ tuicall-uikit-vue.umd.js
```


## 使用指引
为方便您的使用，本组件配套多篇使用指引：
- 如果您想要了解 TUICallKit，请阅读 [组件介绍 TUICallKit](https://cloud.tencent.com/document/product/647/78742)。
- 如果您想把我们的功能直接嵌入到您的项目中，请阅读 [快速接入 TUICallKit](https://cloud.tencent.com/document/product/647/78912)。
- 如果您想要了解详细 API，请阅读 [API 概览](https://cloud.tencent.com/document/product/647/78759)。

## 附录

- 如果你遇到了困难，可以先参阅 [常见问题](https://cloud.tencent.com/document/product/647/78733)。
- 如果发现了示例代码的 bug，欢迎提交 issue。
- 欢迎加入 QQ 群：**646165204**，进行技术交流和反馈~
- 