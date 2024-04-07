const { ArSdk } = requirePlugin("webarPlugin"); //引入插件
Component({
  externalClasses: ["class"],
  properties: {
    licenseKey: {
      type: String,
      value: "",
    },
    appId: {
      type: String,
      value: "",
    },
    authFunc: null,
    plugin3d: null,
    beautify: { type: Object },
    background: "",
    style: {
      // 定义 style 属性可以拿到 style 属性上设置的值
      type: String,
    },
    url: {
      type: String,
      value: "",
    },
    mode: {
      type: String,
      value: "SD",
    },
    autopush: {
      type: Boolean,
      value: false,
    },
    enableVideoCustomRender: {
      type: Boolean,
      value: false,
    },
    muted: {
      type: Boolean,
      value: false,
    },
    enableCamera: {
      type: Boolean,
      value: true,
    },
    autoFocus: {
      type: Boolean,
      value: true,
    },
    orientation: {
      type: String,
      value: "vertical",
    },
    beauty: {
      type: Number,
      value: 0,
    },
    whiteness: {
      type: Number,
      value: 0,
    },
    aspect: {
      type: String,
      value: "9:16",
    },
    minBitrate: {
      type: Number,
      value: 200,
    },
    maxBitrate: {
      type: Number,
      value: 1000,
    },
    audioQuality: {
      type: String,
      value: "high",
    },
    waitingImage: {
      type: String,
      value: "",
    },
    waitingImageHash: {
      type: String,
      value: "",
    },
    zoom: {
      type: Boolean,
      value: false,
    },
    devicePosition: {
      type: String,
      value: "front",
    },
    backgroundMute: {
      type: Boolean,
      value: false,
    },
    mirror: {
      type: Boolean,
      value: false,
    },
    remoteMirror: {
      type: Boolean,
      value: false,
    },
    localMirror: {
      type: String,
      value: "auto",
    },
    audioReverbType: {
      type: Number,
      value: 0,
    },
    videoWidth: {
      type: Number,
      value: 360,
    },
    videoHeight: {
      type: Number,
      value: 640,
    },
    beautyStyle: {
      type: String,
      value: "smooth",
    },
    filter: {
      type: String,
      value: "standard",
    },
    pictureInPictureMode: [],
    voiceChangerType: {
      type: Number,
      value: 0,
    },
    customEffect: {
      type: Boolean,
      value: false,
    },
    skinWhiteness: {
      type: Number,
      value: 0,
    },
    skinSmoothness: {
      type: Number,
      value: 0,
    },
    faceThinness: {
      type: Number,
      value: 0,
    },
    eyeBigness: {
      type: Number,
      value: 0,
    },
    fps: {
      type: Number,
      value: 15,
    },
    enableMic: {
      type: Boolean,
      value: true,
    },
    enableAgc: {
      type: Boolean,
      value: false,
    },
    enableAns: {
      type: Boolean,
      value: false,
    },
    enableEarMonitor: {
      type: Boolean,
      value: false,
    },
  },
  observers: {
    "licenseKey,appId,authFunc": function () {
      this.start();
    },
    "background,status": function (url, status) {
      if (status === "ready") this.setBackground(url);
    },
    authResolve: async function (resolve) {
      if (resolve) {
        const res = await this.data.authFunc();
        resolve(res);
      }
    },
  },
  data: {
    status: "init",
    customStyle: "",
    canvasStyle: `transform: translate(-50%, -50%) scale(1);`,
    authResolve: null,
  }, // 私有数据，可用于模板渲染
  methods: {
    async auth() {
      return new Promise((resolve) => {
        this.setData({
          authResolve: resolve,
        });
      });
    },
    onPushEvent(e) {
      this.triggerEvent("statechange", e.detail);
    },
    onNetStatus(e) {
      this.triggerEvent("netstatus", e.detail);
    },
    onError(e) {
      this.triggerEvent("error", e.detail);
    },
    onBgmStart(e) {
      this.triggerEvent("bgmstart", e.detail);
    },
    onBgmProgress(e) {
      this.triggerEvent("bgmprogress", e.detail);
    },
    onBgmComplete(e) {
      this.triggerEvent("bgmcomplete", e.detail);
    },
    onAudiovolumenotify(e) {
      this.triggerEvent("audiovolumenotify", e.detail);
    },
    onEnterpictureinpicture(e) {
      this.triggerEvent("enterpictureinpicture", e.detail);
    },
    onLeavepictureinpicture(e) {
      this.triggerEvent("leavepictureinpicture", e.detail);
    },
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
    async getCanvasNode(id) {
      return new Promise((resolve) => {
        this.createSelectorQuery()
          .select(`.${id}`)
          .node()
          .exec((res) => {
            const canvasNode = res[0].node;
            resolve(canvasNode);
          });
      });
    },
    async setBackground(url) {
      if (!this.data.customEffect) return;
      if (url) {
        const buffer = await this.download(url);
        this.sdk.setBackground({ type: "image", src: buffer });
      } else {
        this.sdk.setBackground({ type: "image", src: "" });
      }
    },
    async start() {
      if (
        this.sdk ||
        (!this.data.enableVideoCustomRender && !this.data.customEffect)
      )
        return;
      if (!this.data.appId) {
        throw new Error("appId is required");
      }
      if (!this.data.licenseKey) {
        throw new Error("licenseKey is required");
      }
      if (!this.data.authFunc) {
        throw new Error("authFunc is required");
      }
      let output;
      const pusherContext = wx.createLivePusherContext();
      let live = {
        mode: this.data.enableVideoCustomRender ? "custom" : "native",
        pusherContext,
      };
      if (this.data.enableVideoCustomRender) {
        output = await this.getCanvasNode("canvas");
        const size = ArSdk.getRealSize();
        this.setData({
          customStyle: `width:${size.width};height:${size.height};`,
        });
        live.pusherSize = size;
      }
      const sdk = new ArSdk({
        live,
        loading: {
          enable: false,
        },
        output,
        auth: {
          appId: this.data.appId,
          authFunc: this.auth.bind(this),
          licenseKey: this.data.licenseKey,
        },
        beautify: this.data.beautify,
        plugin3d: this.data.plugin3d,
      });
      let sdkEvent = this.data.enableVideoCustomRender
        ? {
            setBeautify: sdk.setBeautify.bind(sdk),
            setEffect: sdk.setEffect.bind(sdk),
            setFilter: sdk.setFilter.bind(sdk),
            getEffectList: sdk.getEffectList.bind(sdk),
            getEffect: sdk.getEffect.bind(sdk),
            getCommonFilter: sdk.getCommonFilter.bind(sdk),
            disable: sdk.disable.bind(sdk),
            enable: sdk.enable.bind(sdk),
            start: sdk.start.bind(sdk),
            stop: sdk.stop.bind(sdk),
            startRecord: sdk.startRecord.bind(sdk),
            stopRecord: sdk.stopRecord.bind(sdk),
            takePhoto: sdk.takePhoto.bind(sdk),
            destroy: sdk.destroy.bind(sdk),
            pusherContext,
          }
        : {
            setBackground: sdk.setBackground.bind(sdk),
            disable: sdk.disable.bind(sdk),
            enable: sdk.enable.bind(sdk),
            destroy: sdk.destroy.bind(sdk),
            pusherContext,
          };
      this.sdk = sdkEvent;
      sdk.on("created", async (_) => {
        console.log("sdk created");
        this.setData({
          status: "created",
        });
        this.triggerEvent("created", sdkEvent);
      });
      sdk.on("ready", async (_) => {
        console.log("sdk ready");
        this.setData({
          status: "ready",
        });
        this.triggerEvent("ready", sdkEvent);
      });
      sdk.on("error", (error) => {
        console.log("sdk error", error);
        this.triggerEvent("error", error);
      });
    },
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
      this.sdk.destroy();
      this.sdk = null;
    },
  },
  attached() {
    if (!this.data.enableVideoCustomRender) return;
    this.observer = this.createIntersectionObserver();
    this.observer.relativeToViewport();
    this.observer.observe(".pusher-box", ({ boundingClientRect }) => {
      const { width, height } = boundingClientRect;
      console.log("obserbeSize:", width, height);
      let scale = width / height / (9 / 16);
      scale = scale >= 1 ? scale : 1 / scale;
      this.setData({
        canvasStyle: `width: ${width}px;height: ${
          (width / 9) * 16
        }px;transform: translate(-50%, -50%) scale(${scale});`,
      });
    });
  },
  detached() {
    this.destroy();
  },
});
