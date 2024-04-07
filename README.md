# 小程序插件接入腾讯云视立方美颜特效

本文档指导您使用微信小程序插件方案接入[腾讯云视立方美颜特效 SDK](https://cloud.tencent.com/document/product/616/71399) ,以下简称视立方 WEBAR。

## 准备工作

1. 在 [微信公众平台](https://mp.weixin.qq.com) 注册并登录小程序。
2. 在 [微信公众平台](https://mp.weixin.qq.com) 添加小程序插件：[视立方 WEBAR](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx04445cff065100ed&token=571048195&lang=zh_CN)
3. 符合接入要求，申请插件并申请试用视立方 WEBAR，详见 [腾讯云视立方控制台](https://cloud.tencent.com/document/product/616/71371)。

## 使用原生微信小程序接入

### 接入配置

1. 使用插件前需在小程序工程的`app.json`中声明要使用的插件，例如：

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

2. 在小程序目录安装 npm 包: tencentcloud-webar-wx

```bash
npm install tencentcloud-webar-wx
```

3. 打开微信开发者工具，工具=> 执行构建 npm

### 使用 webar-camera 组件接入美颜

webar-camera 组件使用微信组件 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 进行封装，适用于拍摄录像场景下的美颜特效处理。

1. 在 page 的`.json`文件中定义需要引入的`webar-camera`组件，使用`plugin://`协议。

```json
{
  "usingComponents": {
    "webar-camera": "tencentcloud-webar-wx/webar-camera"
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

组件 webar-camera 的使用方法和微信原生标签 camera 的方法一致，可参考微信小程序标签 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 的文档说明，美颜特效相关参数请参考[组件属性说明](#propsdesc)。

3. 在 page 的`.js`文件中使用 webarContext 设置美颜特效。

webar-camera 会通过 created 事件返回 [WebarContext](#method)

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
},
```

### 使用 webar-live-pusher 组件

webar-live-pusher 组件使用微信组件 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 进行封装，适用于直播推流场景下的美颜特效处理。

#### 设置美颜、滤镜、美妆、贴纸

该模式目前仅支持使用云直播接入，暂不支持 trtc

1. 在 page 的`.json`文件中定义需要引入的`webar-live-pusher`组件。

```json
{
  "usingComponents": {
    "webar-live-pusher": "tencentcloud-webar-wx/webar-live-pusher"
  }
}
```

2. 在 page 的`.wxml`文件中使用组件。

```html
<!--美颜特效模式，支持除虚拟背景外所有美颜特效-->
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

组件 webar-live-pusher 的使用方法和微信原生标签 live-pusher 的方法一致，更多属性可参考微信小程序标签 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 的文档说明，美颜特效相关参数请参考[组件属性说明](#propsdesc)。

3. 在 page 的.js 文件中使用 sdkContext 设置美颜特效。

webar-live-pusher 会通过 created 事件返回 [WebarContext](#method)

```js
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
},
```

#### 设置虚拟背景

1. 在 page 的`.json`文件中定义需要引入的`webar-live-pusher`组件。

```json
{
  "usingComponents": {
    "webar-live-pusher": "webar-live-pusher/webar-live-pusher"
  }
}
```

2. 在 page 的`.wxml`文件中使用组件。

<!--虚拟背景模式，仅支持虚拟背景-->

<webar-live-pusher
  custom-effect
  licenseKey="{{licenseKey}}"
  appId="{{appId}}"
  authFunc="{{authFunc}}"
  plugin3d="{{plugin3d}}"
  background="{{backgroundUrl}}"
  bind:created="onArCreated"
  style="width: 100vw; height: 100vh"
/>

> **注意**
>
> 1. webar-live-pusher 分为 美颜特效 和 虚拟背景，开启 enableVideoCustomRender 即为 美颜特效 模式，开启 custom-effect 即为 虚拟背景，两者不可同时使用。

## 使用 uniapp 接入

### 接入前配置

1. 使用组件前需在 uniapp 工程的`manifest.json`中声明要使用的插件：

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

2. 在 uniapp 项目根目录安装 npm 包: tencentcloud-webar-wx

```bash
npm install tencentcloud-webar-wx
```

### 使用 WebArCamera 组件接入美颜

WebArCamera 组件使用微信组件 [camera](https://developers.weixin.qq.com/miniprogram/dev/component/camera.html) 进行封装，适用于拍摄录像场景下的美颜特效处理，美颜特效相关参数请参考[插件相关组件美颜特效属性说明](#propsdesc)。

1. 在引入组件的页面 的`.vue`文件中使用组件。

WebArCamera 会通过 created 事件返回 [WebarContext](#method)

```html
<template>
  <view>
    <WebArCamera
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
  import WebArCamera from "tencentcloud-webar-wx/WebArCamera/WebArCamera.vue";

  export default {
    components: {
      WebArCamera,
    },
    methods: {
      // 此事件会返回 webarContext 实例，通过该实例调用 webar sdk的美颜方法。方法介绍参考文末。
      onArCreated(sdk) {
        webarContext = sdk.detail || sdk; // uniapp 下事件有可能有detail也有可能没有
        // 设置美颜
        webarContext.setBeautify({
          whiten: 0.5,
          dermabrasion: 0.6,
        });
        // 设置滤镜
        webarContext.setFilter(id, 1);
        // 设置美妆、特效、贴纸
        webarContext.setEffect([{ id, intensity: 1 }]);
      },
    },
  };
</script>
```

### 使用 WebArPusher 组件接入美颜

#### 设置美颜、滤镜、美妆、贴纸

WebArPusher 组件使用微信组件 [live-pusher](https://developers.weixin.qq.com/miniprogram/dev/component/live-pusher.html) 进行封装，适用于直播推流场景下的美颜特效处理，美颜特效相关参数请参考[插件相关组件美颜特效属性说明](#propsdesc)，此组件目前仅支持使用云直播接入，暂不支持 trtc。

1. 在引入组件的页面 的`.vue`文件中使用组件。

WebArPusher 会通过 created 事件返回 [WebarContext](#method)

```html
<template>
  <view>
    <WebArPusher
      enableVideoCustomRender
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
  import WebArPusher from "tencentcloud-webar-wx/WebArPusher/WebArPusher.vue";
  export default {
    components: {
      WebArPusher,
    },
    methods: {
      // 此事件会返回 webarContext 实例，通过该实例调用 webar sdk的美颜方法。方法介绍参考文末。
      onArCreated(sdk) {
        webarContext = sdk.detail || sdk; // uniapp 下事件有可能有detail也有可能没有
        // 设置美颜
        webarContext.setBeautify({
          whiten: 0.5,
          dermabrasion: 0.6,
        });
        // 设置滤镜
        webarContext.setFilter(id, 1);
        // 设置美妆、特效、贴纸
        webarContext.setEffect([{ id, intensity: 1 }]);
      },
    },
  };
</script>
```

#### 设置虚拟背景

1. 在引入组件的页面 的`.vue`文件中使用组件。

```html
<template>
  <view>
    <WebArPusher
      custom-effect
      :licenseKey="licenseKey"
      :appId="appId"
      :authFunc="authFunc"
      :plugin3d="plugin3d"
      :background="backgroundUrl"
      @created="onArCreated"
      style="width: 100vw; height: 100vh"
    />
  </view>
</template>
```

> **注意**
>
> 1. WebArPusher 分为 美颜特效 和 虚拟背景，开启 enableVideoCustomRender 即为 美颜特效 模式，开启 custom-effect 即为 虚拟背景，两者不可同时使用。

## <a id="propsdesc">组件美颜特效属性说明</a>

| 属性        | 类型           | 默认值 | 必填 | 说明                                                                                   |
| :---------- | :------------- | :----- | :--- | :------------------------------------------------------------------------------------- |
| licenseKey  | string         | ""     | 是   | 腾讯云视立方 licenseKey                                                                |
| appId       | string         | ""     | 是   | 腾讯云 appid                                                                           |
| authFunc    | async function | null   | 是   | 需返回 signature, timestamp，详见[WEBAR 鉴权方法](#authFunc)，传递时请不要包含在对象中 |
| plugin3d    | function       | null   | 否   | 3d 特效插件，开启 3d 贴纸时需传入                                                      |
| beautify    | Object         | null   | 否   | 初始美颜参数，取值范围：0-1，可用： whiten、dermabrasion、lift、shave、eye、chin       |
| background  | string         | ''     | 否   | 虚拟背景图片 url，域名需加入小程序白名单                                               |
| bindcreated | event          | null   | 否   | 腾讯特效 sdk 初始化完成事件                                                            |
| bindready   | event          | null   | 否   | 腾讯特效 sdk 加载完成事件                                                              |

## <a id="authFunc">WEBAR 鉴权方法 authFunc 生成方式</a>

```js
const config = {
    appid: '您的腾讯云APPID',
    token: '您的Token',
}
const authFunc = async function() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = sha256(timestamp + config.token + config.appid + timestamp).toUpperCase();
    return { signature, timestamp };
```

此方法仅测试时使用，为防止 token 泄露，发布时请使用服务端加密，详见[腾讯云-腾讯特效 SDK 官网文档](https://cloud.tencent.com/document/product/616/71364)

## <a id="method">插件 webarContext 实例方法说明</a>

| 属性            | 类型                                                                                                        | 返回值 | 必填 | 说明                                                    |
| :-------------- | :---------------------------------------------------------------------------------------------------------- | :----- | :--- | :------------------------------------------------------ |
| pusherContext   | [LivePusherContext](https://developers.weixin.qq.com/miniprogram/dev/api/media/live/LivePusherContext.html) | ""     | 否   | 插件中 live-pusher 实例，仅 webar-live-pusher 组件拥有  |
| setBeautify     | function(beautyParam):void                                                                                  | ""     | 否   | 设置美颜                                                |
| setFilter       | function(filterId, intensity):void                                                                          | null   | 否   | 设置滤镜                                                |
| setEffect       | function([{ id, intensity }]):void                                                                          | null   | 否   | 设置特效（美妆、贴纸）                                  |
| setBackground   | function({ type: 'image',src: arrayBuffer }):void                                                           | null   | 否   | 设置虚拟背景，仅 pusher 组件在开启 custom-effect 时生效 |
| getCommonFilter | function():Promise\<Filter\>                                                                                | null   | 否   | 获取滤镜列表                                            |
| getEffectList   | function():Promise\<Effect\>                                                                                | null   | 否   | 获取特效列表（美妆、贴纸）                              |

更多方法请参考[腾讯特效-API 文档](https://cloud.tencent.com/document/product/616/75676#.E5.AF.B9.E8.B1.A1.E6.96.B9.E6.B3.95)
