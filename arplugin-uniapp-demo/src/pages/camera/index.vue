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
    </view>
    <WebArCamera
      :licenseKey="licenseKey"
      :appId="appId"
      :authFunc="authFunc"
      :plugin3d="plugin3d"
      @created="onArCreated"
      style="width: 100vw; height: 100vh"
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
      beautifyEnable: false,
      filterEnable: false,
      makeupEnable: false,
      stickerEnable: false,
      effectState: [],
    };
  },
  methods: {
    onArCreated(sdk) {
      this.sdk = sdk;
    },
  },
  watch: {
    beautifyEnable: function (val) {
      if (val) {
        this.sdk.setBeautify({
          whiten: 1,
          dermabrasion: 1,
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
  width: 100vw;
  bottom: 10%;
  justify-content: space-between;
  z-index: 9999;
}
.btn_box button {
  font-size: 30rpx;
}
</style>
