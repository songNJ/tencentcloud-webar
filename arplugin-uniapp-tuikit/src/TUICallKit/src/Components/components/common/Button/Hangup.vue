<template>
  <IconBtn
    :loadingIcon="loading"
    :loading="!isClickable"
    :icon="hangupSrc"
    :text="t('hangup')"
    :isMobile="isMobile"
    @click="hangupEvent"
  />
</template>

<script lang="ts" setup>
import { TUICallKitServer,t, CallMediaType,TUIGlobal } from '../../../../TUICallService/index';
import hangupMobile from '../../../assets/mobile/hangup.png';
import hangupDesk from '../../../assets/desktop/hangup.svg';
import loadingAudio from '../../../assets/common/loading-audio.svg';
import loadingVideo from '../../../assets/common/loading-video.png';
import IconBtn from './Btn/IconBtn.vue';

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
  isClickable: {
    type: Boolean,
    required: true,
  },
  isGroupCall: {
    type: Boolean,
    required: true,
  },
  callType: {
    type: Number,
    required: true,
  },
});
const hangupSrc = props.isMobile ? hangupMobile : hangupDesk;
// 桌面端或者移动端 C2C 视频通话
const singleCondition = props.isMobile && !props.isGroupCall && props.callType === CallMediaType.VIDEO;
const loading = !props.isMobile || singleCondition ? loadingVideo : loadingAudio;

const hangupEvent = async () => {
  await TUICallKitServer.hangup();
};
</script>

<style lang="scss" src="./style/index.scss" scoped>
</style>
