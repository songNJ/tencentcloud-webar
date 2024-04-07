<template>
  <view>
    <view class="btn_box">
      <button @click="toggleBackground">虚拟背景：{{ backgroundUrl ? '开' : '关' }}</button>
    </view>
    <WebArPusher
      custom-effect
      autopush
      :background="backgroundUrl"
      :url="push_url"
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
import WebArPusher from 'tencentcloud-webar-wx/WebArPusher/WebArPusher.vue';
import { authFunc, APP_ID, LICENSE_KEY } from '../../utils/auth';
import { plugin3d } from '../../utils/plugin-3d';
const url = 'https://webar-static.tencent-cloud.com/assets/back-new/class.png';

export default {
  components: {
    WebArPusher,
  },
  data() {
    return {
      sdk: null,
      licenseKey: LICENSE_KEY,
      appId: APP_ID,
      authFunc,
      push_url: '',
      backgroundUrl: url,
    };
  },
  methods: {
    onArCreated(sdk) {
      this.sdk = sdk;
    },
    toggleBackground: function () {
      this.backgroundUrl = this.backgroundUrl ? '' : url;
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
