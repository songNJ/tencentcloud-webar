<template>
  <IconBtn
    :icon="hangupSrc"
    :text="t('reject')"
    :isMobile="isMobile"
    @click="rejectEvent"
  />
</template>

<script lang="ts" setup>
import { TUICallKitServer , t } from '../../../../TUICallService/index';
import rejectMobile from '../../../assets/mobile/hangup.png';
import rejectDesk from '../../../assets/desktop/hangup.svg';
import IconBtn from './Btn/IconBtn.vue';

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});
const hangupSrc = props.isMobile ? rejectMobile : rejectDesk;

const rejectEvent = async () => {
  await TUICallKitServer.reject();
};
</script>
