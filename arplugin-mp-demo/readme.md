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

### 使用 webar-image 组件接入图片美颜特效

webar-image 基于 webgl 相关能力，提供图片和相册美颜特效处理能力，支持导出和预览。

1. 在 page 的`.json`文件中定义需要引入的`webar-image`组件。

```json
{
	"usingComponents": {
		"webar-image": "tencentcloud-webar-wx/webar-image"
	}
}
```

2. 在 page 的`.wxml`文件中使用组件。

```html
<webar-image
	licenseKey="{{licenseKey}}"
	appId="{{appId}}"
	authFunc="{{authFunc}}"
	plugin3d="{{plugin3d}}"
	url="https://webar-static.tencent-cloud.com/assets/image2.jpg"
	bind:created="onArCreated"
	style="width: 100vw; height: 100vh" />
```

3. 在 page 的`.js`文件中使用 webarContext 设置美颜特效。

webar-image 会通过 created 事件返回 [WebarContext](#method)

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
	style="width: 100vw; height: 100vh" />
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
