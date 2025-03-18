<template>
  <view>
    <view class="btn_box">
      <button @click="beautifyEnable = !beautifyEnable">
        美颜：{{ beautifyEnable ? '开' : '关' }}
      </button>
      <button @click="filterEnable = !filterEnable">滤镜：{{ filterEnable ? '开' : '关' }}</button>
      <button @click="makeupEnable = !makeupEnable">美妆：{{ makeupEnable ? '开' : '关' }}</button>
      <button @click="stickerEnable = !stickerEnable">
        贴纸：{{ stickerEnable ? '开' : '关' }}
      </button>
      <button @click="takePhoto">
        拍照
      </button>
      <button v-if="!isRecord" @click="startRecord">开始录制</button>
      <button v-else @click="stopRecord">停止录制</button>
    </view>
    <WebArCamera
      :licenseKey="licenseKey"
      :appId="appId"
      :authFunc="authFunc"
      :plugin3d="plugin3d"
      @created="onArCreated"
      my-style="width: 100vw; height: 100vh"
      class="webar"
    />
  </view>
</template>

<script>
import WebArCamera from 'tencentcloud-webar-wx/WebArCamera/WebArCamera.vue';
import { authFunc, APP_ID, LICENSE_KEY } from '../../utils/auth';
import { plugin3d } from '../../utils/plugin-3d';
export default {
  components: {
    WebArCamera,
  },
  data() {
    return {
      sdk: null,
      licenseKey: LICENSE_KEY,
      appId: APP_ID,
      authFunc,
      plugin3d,
      beautifyEnable: false,
      filterEnable: false,
      makeupEnable: false,
      stickerEnable: false,
      effectState: [],
      isRecord: false,
    };
  },
  methods: {
    onArCreated(sdk) {
      this.sdk = sdk;
    },
    async takePhoto(){
      // tempFilePath 仅插件版本大于1.0.14支持
      const { uint8ArrayData, width, height, tempFilePath } = await this.sdk.takePhoto();
      wx.previewImage({ urls: [tempFilePath] });
      // 保存至相册
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      });
    },
    startRecord() {
      this.isRecord = true;
      this.sdk.startRecord().then(()=>{
        console.log('start success')
      })
    },
    async stopRecord() {
    this.isRecord = false;
		// useOriginAudio 为 false 时不录制音频
		const result = await this.sdk.stopRecord({ useOriginAudio: true });
      const { tempFilePath } = result;

      wx.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
        success: (_) => {
          console.log('save success')
        },
        fail: (error) => {
          console.log(error);
          
        },
      });
    }
  },
  watch: {
    beautifyEnable: function (val) {
      if (val) {
        this.sdk.setBeautify({
          whiten: 0.3,
          dermabrasion: 0.7,
          eye: 1,
        });
      } else {
        this.sdk.setBeautify({
          whiten: 0,
          dermabrasion: 0,
          eye: 0,
        });
      }
    },
    filterEnable(val) {
      if (val) {
        this.sdk.setFilter('5505217E53997405', 1);
      } else {
        this.sdk.setFilter('5505217E53997405', 0);
      }
    },
    makeupEnable(val) {
      if (val) {
        this.effectState.push({
          // 美妆
          id: '9C7E317E53997405',
          intensity: 1,
        });
      } else {
        this.effectState = this.effectState.filter((item) => {
          return item.id !== '9C7E317E53997405';
        });
      }
      this.sdk.setEffect(this.effectState, 1);
      console.log(this.effectState);
    },
    stickerEnable(val) {
      if (val) {
        this.effectState.push({
          id: 'BF3C417FD91CACC0' /* 悟空特效 */,
          intensity: 1,
        });
      } else {
        this.effectState = this.effectState.filter((item) => {
          return item.id !== 'BF3C417FD91CACC0' /* 悟空特效 */;
        });
      }
      console.log(this.effectState);
      this.sdk.setEffect(this.effectState, 1);
    },
  },
};
</script>

<style>
.webar {
  width: 100%;
  height: 100vh;
}
.btn_box {
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  width: 100vw;
  bottom: 10%;
  justify-content: flex-start;
  z-index: 9999;
}
.btn_box button {
  width: 300rpx;
	font-size: 30rpx;
  margin-left: 15px;
	margin-right: 15px;
}
</style>
