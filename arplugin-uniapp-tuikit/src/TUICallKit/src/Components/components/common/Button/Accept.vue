<template>
  <IconBtn
    :icon="acceptSrc"
    :text="t('accept')"
    :isMobile="isMobile"
    @click="acceptEvent"
  />
</template>

<script lang="ts" setup>
import { TUICallKitServer, t, CallMediaType } from '../../../../TUICallService/index';
import acceptMobile from '../../../assets/mobile/accept.png';
import acceptAudioDesk from '../../../assets/desktop/acceptAudio.svg';
import acceptVideoDesk from '../../../assets/desktop/acceptVideo.svg';
import IconBtn from './Btn/IconBtn.vue';

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
  callType: {
    type: Number,
    required: true,
  },
});
const acceptSrc = props.isMobile ? acceptMobile : props.callType === CallMediaType.AUDIO ? acceptAudioDesk : acceptVideoDesk;

const acceptEvent = async () => {
  await TUICallKitServer.accept();
};
</script>
