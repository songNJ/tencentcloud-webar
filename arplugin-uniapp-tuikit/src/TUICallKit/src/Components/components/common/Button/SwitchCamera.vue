<template>
  <IconBtn
    :icon="switchCamera"
    :size="32"
    text=" "
    :isMobile="true"
    @click="frontCamera"
  />
</template>

<script lang="ts" setup>
import switchCamera from '../../../assets/mobile/switch_camera.png';
import { TUICallKitServer } from '../../../../TUICallService/index';
import IconBtn from './Btn/IconBtn.vue';

function frontCamera() {
  TUICallKitServer.switchCamera();
}
</script>

<style lang="scss" scoped>
.btn-operate-item {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 10px;
  right: -100px;

  .operate-img {
    width: 32px;
    height: 32px;
  }
}
</style>
