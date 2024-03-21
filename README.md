# 小程序插件接入腾讯云视立方美颜特效

本文档指导您使用微信小程序插件方案接入[腾讯云视立方美颜特效 SDK](https://cloud.tencent.com/document/product/616/71399) ,以下简称视立方 WEBAR。

## 准备工作

1. 在 [微信公众平台](https://mp.weixin.qq.com) 注册并登录小程序。
2. 在 [微信公众平台](https://mp.weixin.qq.com) 添加小程序插件：[视立方 WEBAR](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx04445cff065100ed&token=571048195&lang=zh_CN)
3. 符合接入要求，申请插件并购买视立方 WEBAR，详见 [腾讯云视立方控制台](https://cloud.tencent.com/document/product/616/71371)。

## 使用原生微信小程序接入

### 在项目 app.json 中引入插件

使用插件前需在小程序工程的`app.json`中声明要使用的插件，例如：

```json
{
  "plugins": {
    "webarPlugin": {
      "version": "1.0.1",
      "provider": "wx04445cff065100ed"
    }
  }
}
```

### 使用插件中的 webar-camera 组件接入美颜

webar-camera 组件使用微信组件 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 进行封装，适用于拍摄录像场景下的美颜特效处理。

1. 在 page 的`.json`文件中定义需要引入的`webar-camera`组件，使用`plugin://`协议。

```json
{
  "usingComponents": {
    "webar-camera": "plugin://webarPlugin/webar-camera"
  }
}
```

2. 在 page 的`.wxml`文件中使用组件。

```html
<webar-camera
  licenseKey="{{licenseKey}}"
  appId="{{appId}}"
  authFunc="{{authFunc}}"
  plugin3d="{{plugin3d}}"
  bind:created="onArCreated"
  style="width: 100vw; height: 100vh"
/>
```

组件 webar-camera 的使用方法和微信原生标签 camera 的方法一致，可参考微信小程序标签 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 的文档说明，美颜特效相关参数请参考[组件属性说明](#插件相关组件美颜特效属性说明)。

3. 在 page 的`.js`文件中使用 webarContext 设置美颜特效
   webar-camera 会通过 created 事件返回 webarContext

```js
onArCreated(event) {
  const webarContext = event.detail
  // 设置美颜
  webarContext.setBeautify({
    whiten: 0.5,
    dermabrasion: 0.6
  });
  // 设置滤镜
  webarContext.setFilter(id, 1);
  // 设置美妆、特效、贴纸
  webarContext.setEffect([{ id, intensity:1 }]);
  // 设置虚拟背景，仅直播组件 webar-live-pusher 组件在 custom-effect 开启时生效
  // 由于 http 请求在插件中需配置域名白名单，故需传入图片 buffer
  webarContext.setBackground({ type: 'image', src: arraybuffer });
},
```

### 使用插件中的 webar-live-pusher 组件

webar-live-pusher 组件使用微信组件 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 进行封装，适用于直播推流场景下的美颜特效处理。

1. 在 page 的`.json`文件中定义需要引入的`webar-live-pusher`组件，使用`plugin://`协议。

```json
{
  "usingComponents": {
    "webar-live-pusher": "plugin://webarPlugin/webar-live-pusher"
  }
}
```

2. 在 page 的`.wxml`文件中使用组件。

```html
<!--native模式，仅支持虚拟背景-->
<webar-live-pusher
  custom-effect
  licenseKey="{{licenseKey}}"
  appId="{{appId}}"
  authFunc="{{authFunc}}"
  plugin3d="{{plugin3d}}"
  bind:created="onArCreated"
  style="width: 100vw; height: 100vh"
/>
<!--custom模式，支持除虚拟背景外所有美颜特效-->
<webar-live-pusher
  enableVideoCustomRender
  licenseKey="{{licenseKey}}"
  appId="{{appId}}"
  authFunc="{{authFunc}}"
  plugin3d="{{plugin3d}}"
  bind:created="onArCreated"
  style="width: 100vw; height: 100vh"
/>
```

组件 webar-live-pusher 的使用方法和微信原生标签 live-pusher 的方法一致，更多属性可参考微信小程序标签 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 的文档说明，美颜特效相关参数请参考[组件属性说明](#插件相关组件美颜特效属性说明)。

3. 在 page 的.js 文件中使用 sdkContext 设置美颜特效。

```js
async download(url) {
    if (url instanceof ArrayBuffer) return url;
    return new Promise((resolve, reject) => {
        wx.request({
        url: url,
        responseType: "arrayBuffer",
        success: (res) => {
            const { data } = res;
            resolve(data);
        },
        fail: (res) => {
            reject(res);
        },
        });
    });
},
async onArCreated(event) {
  const webarContext = event.detail
  // 设置美颜
  webarContext.setBeautify({
    whiten: 0.5,
    dermabrasion: 0.6
  });
  // 设置滤镜
  webarContext.setFilter(id, 1);
  // 设置美妆、特效、贴纸
  webarContext.setEffect([{ id, intensity:1 }]);

  // 设置虚拟背景，仅直播组件 webar-live-pusher 组件在 custom-effect 开启时生效
  // 由于 http 请求在插件中需配置域名白名单，故可将 url下载为buffer后传入
  const buffer = await this.download(url)
  webarContext.setBackground({ type: 'image', src: buffer});
},
```

> **注意**
>
> 1. webar-live-pusher 分为 custom 模式和 native 模式，开启 enableVideoCustomRender 即为 custom 模式，开启 customEffect 即为 native 模式。
> 2. webar-live-pusher custom 模式和 webar-camera 组件功能一致，支持美颜、滤镜、贴纸、美妆等，native 模式仅支持虚拟背景。
> 3. native 模式仅支持在 webar-live-pusher 中使用。

### 使用 WEBAR JS SDK 进行接入

若组件不能满足您的需求，可使用 webar js-sdk 配合 live-pusher、camera 组件，更加灵活。
使用方式如下：

```html
<camera
  device-position="{{'front'}}"
  frame-size="large"
  flash="off"
  resolution="medium"
  style="width: 750rpx; height: 134rpx;position:absolute;top:-9999px;"
/>
//sdk 将处理完的画面实时输出到此 canvas 上
<canvas type="webgl" id="main-canvas" style="width: 750rpx; height: 1334rpx;">
</canvas>
```

```js
const { ArSdk } = requirePlugin("webarPlugin");
const outputCanvas = await this.getNode("main-canvas");
const cameraContext = wx.createCameraContext();
const sdk = new ArSdk({
  camera: {
    width: 720,
    height: 1280,
    cameraContext,
  },
  output: outputCanvas,
  loading: {
    enable: false,
  },
  auth: {
    licenseKey: LICENSE_KEY,
    appId: APP_ID,
    authFunc: authFunc,
  },
  plugin3d: plugin3d, // 0.3.0之后版本写法，按需初始化3d模块，如不需要3d模块，可以省略此参数。
});
```

SDK 具体使用方式请参考 [视立方 WEBAR 小程序接入文档](https://cloud.tencent.com/document/product/616/75675)

## 使用 uniapp 接入

### 在项目 manifest.json 中引入插件

使用插件前需在 uniapp 工程的`manifest.json`中声明要使用的插件，例如：

```json
{
  "mp-weixin": {
    "plugins": {
      "webarPlugin": {
        "version": "1.0.1",
        "provider": "wx04445cff065100ed"
      }
    }
  }
}
```

### 使用插件中的 webar-camera 组件接入美颜

webar-camera 组件使用微信组件 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 进行封装，适用于拍摄录像场景下的美颜特效处理。

1. 在 uniapp 工程 src 目录下的 pages.json 内 style 节点下配置微信平台的 usingComponents，例如：

```json
{
  "path": "pages/index/index",
  "style": {
    "mp-weixin": {
      "usingComponents": {
        "webar-camera": "plugin://webarPlugin/webar-camera"
      }
    }
  }
}
```

2. 在引入组件的页面 的`.vue`文件中使用组件。

```html
<template>
  <view>
    <webar-camera
      :licenseKey="licenseKey"
      :appId="appId"
      :authFunc="authFunc"
      :plugin3d="plugin3d"
      @created="onArCreated"
      style="width: 100vw; height: 100vh"
    />
  </view>
</template>

<script>
  methods: {
    // 此事件会返回 webarContext 实例，通过该实例调用 webar sdk的美颜方法。方法介绍参考文末。
    onArCreated(sdk) {
        webarContext = sdk.detail || sdk; // uniapp 下事件有可能有detail也有可能没有
        // 设置美颜
        webarContext.setBeautify({
        whiten: 0.5,
        dermabrasion: 0.6
        });
        // 设置滤镜
        webarContext.setFilter(id, 1);
        // 设置美妆、特效、贴纸
        webarContext.setEffect([{ id, intensity:1 }]);
    },
  }
</script>
```

组件 webar-camera 的使用方法和微信原生标签 camera 的方法一致，可参考微信小程序标签 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 的文档说明，美颜特效相关参数请参考[插件相关组件美颜特效属性说明](#插件相关组件美颜特效属性说明)。

### 使用插件中的 webar-live-pusher 组件

webar-live-pusher 组件使用微信组件 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 进行封装，适用于直播推流场景下的美颜特效处理。

使用方式请结合本文：《原生微信小程序使用 webar-live-pusher》 及 《uniapp 项目使用 webar-camera》

### 使用 WEBAR JS SDK 进行接入

使用方式同 [原生微信小程序](#使用插件中的推流组件);

## 插件相关组件美颜特效属性说明

| 属性        | 类型     | 默认值 | 必填 | 说明                                                                             |
| :---------- | :------- | :----- | :--- | :------------------------------------------------------------------------------- |
| licenseKey  | string   | ""     | 是   | 腾讯云视立方 licenseKey                                                          |
| appId       | string   | ""     | 是   | 腾讯云 appid                                                                     |
| authFunc    | function | null   | 是   | 腾讯云视立方 WEBAR 鉴权方法，详见下文                                            |
| plugin3d    | function | null   | 否   | 3d 特效插件，开启 3d 贴纸时需传入                                                |
| beautify    | Object   | null   | 否   | 初始美颜参数，取值范围：0-1，可用： whiten、dermabrasion、lift、shave、eye、chin |
| bindcreated | event    | null   | 否   | 腾讯特效 sdk 初始化完成事件                                                      |
| bindready   | event    | null   | 否   | 腾讯特效 sdk 加载完成事件                                                        |

## WEBAR 鉴权方法 authFunc 生成方式

```js
const config = {
    appid: '您的腾讯云APPID',
    token: '您的视立方 web Token',
}
const authFunc = function() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = sha256(timestamp + token + config.appid + timestamp).toUpperCase();
    return { signature, timestamp };
```

由于微信小程序插件会校验域名白名单，故推荐使用本地鉴权方式。
详见[腾讯云-腾讯特效 SDK 官网文档](https://cloud.tencent.com/document/product/616/71364)

## 插件 webarContext 实例方法说明

| 属性            | 类型                                                                                                        | 返回值 | 必填 | 说明                                                           |
| :-------------- | :---------------------------------------------------------------------------------------------------------- | :----- | :--- | :------------------------------------------------------------- |
| pusherContext   | [LivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html) | ""     | 否   | 插件中 live-pusher 实例，仅 webar-live-pusher 组件拥有         |
| setBeautify     | function(beautyParam):void                                                                                  | ""     | 否   | 设置美颜                                                       |
| setFilter       | function(filterId, intensity):void                                                                          | null   | 否   | 设置滤镜                                                       |
| setEffect       | function([{ id, intensity }]):void                                                                          | null   | 否   | 设置特效（美妆、贴纸）                                         |
| setBackground   | function({ type: 'image',src: arrayBuffer }):void                                                           | null   | 否   | 设置虚拟背景，仅 webar-live-pusher 在开启 custom-effect 时生效 |
| getCommonFilter | function():Promise\<Filter\>                                                                                | null   | 否   | 获取滤镜列表                                                   |
| getEffectList   | function():Promise\<Effect\>                                                                                | null   | 否   | 获取特效列表（美妆、贴纸）                                     |
