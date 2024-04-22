## 准备工作

1. 在 [微信公众平台](https://mp.weixin.qq.com) 注册并登录小程序。
2. 在 [微信公众平台](https://mp.weixin.qq.com) 添加小程序插件：[视立方 WEBAR](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx04445cff065100ed&token=571048195&lang=zh_CN)
3. 符合接入要求，申请插件并申请试用视立方 WEBAR，详见 [腾讯云视立方控制台](https://cloud.tencent.com/document/product/616/71371)。

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

### 使用 WebArImage 组件接入图片美颜特效

WebArImage 基于 webgl 相关能力，提供图片和相册美颜特效处理能力，支持导出和预览。

1. 在引入组件的页面 的`.vue`文件中使用组件。

WebArImage 会通过 created 事件返回 [WebarContext](#method)

```html
<template>
  <view>
    <WebArImage
      :licenseKey="licenseKey"
      :appId="appId"
      :authFunc="authFunc"
      :plugin3d="plugin3d"
      url="https://webar-static.tencent-cloud.com/assets/image2.jpg"
      @created="onArCreated"
      my-style="width: 100vw; height: 100vh"
    />
  </view>
</template>

<script>
  import WebArImage from 'tencentcloud-webar-wx/WebArImage/WebArImage.vue';

  export default {
    components: {
      WebArImage,
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
  import WebArCamera from 'tencentcloud-webar-wx/WebArCamera/WebArCamera.vue';

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
  import WebArPusher from 'tencentcloud-webar-wx/WebArPusher/WebArPusher.vue';
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
