<template>
  <IconBtn
    :icon="speakerSrc"
    :text="t('speaker')"
    :isMobile="true"
    @click="switchStatus"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '../../../../adapter-vue';
import { TUICallKitServer, TUIStore, StoreName, NAME, t } from '../../../../TUICallService/index';
import speakerMobile from '../../../assets/mobile/speaker-true.png';
import speakerCloseMobile from '../../../assets/mobile/speaker-false.png';
import IconBtn from './Btn/IconBtn.vue';

const speakerSrc = ref(TUIStore.getData(StoreName.CALL, NAME.IS_EAR_PHONE) ? speakerCloseMobile : speakerMobile);

const handEarPhoneChange = (value) => {
  speakerSrc.value = value ? speakerCloseMobile : speakerMobile;
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, {
    [NAME.IS_EAR_PHONE]: handEarPhoneChange,
  });
});
onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.IS_EAR_PHONE]: handEarPhoneChange,
  });
});

const switchStatus = () => {
  TUICallKitServer.setSoundMode();
};
</script>
