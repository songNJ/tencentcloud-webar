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
    style: {
      // 定义 style 属性可以拿到 style 属性上设置的值
      type: String,
    },
    devicePosition: {
      type: String,
      value: "front",
    },
    flash: {
      type: String,
      value: "off",
    },
    resolution: {
      type: String,
      value: "medium",
    },
    frameSize: {
      type: String,
      value: "large",
    },
  },
  observers: {
    "licenseKey,appId,authFunc": function (licenseKey, appId, authFunc) {
      this.start();
    },
    authResolve: async function (resolve) {
      if (resolve) {
        const res = await this.data.authFunc();
        resolve(res);
      }
    },
  },
  data: {
    customStyle: "",
    canvasWidth: "",
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
    onError(e) {
      this.triggerEvent("error", e.detail);
    },
    onInitdone(e) {
      this.triggerEvent("initdone", e.detail);
    },
    onStop(e) {
      this.triggerEvent("stop", e.detail);
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
    async getNodeSize(id) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.createSelectorQuery()
            .select(`.${id}`)
            .boundingClientRect((res) => resolve(res))
            .exec();
        }, 150);
      });
    },
    async start() {
      if (this.sdk) return;
      if (!this.data.appId) {
        throw new Error("appId is required");
      }
      if (!this.data.licenseKey) {
        throw new Error("licenseKey is required");
      }
      if (!this.data.authFunc) {
        throw new Error("authFunc is required");
      }
      const { width, height } = await this.getNodeSize("camera-box");
      const realHeight = Math.round(720 * (height / width));
      const output = await this.getCanvasNode("canvas");
      const cameraContext = wx.createCameraContext();
      const sdk = new ArSdk({
        camera: {
          width: 720,
          height: realHeight,
          cameraContext,
        },
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
      const sdkEvent = {
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
        cameraContext,
      };
      this.sdk = sdkEvent;
      sdk.on("created", async (_) => {
        console.log("sdk created");
        this.triggerEvent("created", sdkEvent);
      });
      sdk.on("ready", async (_) => {
        console.log("sdk ready");
        this.triggerEvent("ready", sdkEvent);
      });
      sdk.on("error", (error) => {
        console.log("sdk error", error);
        this.triggerEvent("error", error);
      });
    },
    destroy() {
      if (sdk) {
        this.sdk.destroy();
        this.sdk = null;
      }
    },
  },
  attached() {},
  detached() {
    this.destroy();
  },
});
