<template>
  <div class="camera-container">
    <IconBtn
      ref="btnRef"
      :icon="micSrc"
      :text="t('microphone')"
      :isMobile="isMobile"
      @click="switchStatus"
    />
  </div>

</template>

<script lang="ts" setup>
import { ref, watch, onMounted , onUnmounted } from '../../../../adapter-vue';
import { TUICallKitServer , TUIStore , StoreName , NAME , t } from '../../../../TUICallService/index';
import { DeviceType } from '../../../../TUICallService/const/call';
import micMobile from '../../../assets/mobile/audio-true.png';
import micCloseMobile from '../../../assets/mobile/audio-false.png';
import micDesk from '../../../assets/desktop/microphone.svg';
import micCloseDesk from '../../../assets/desktop/microphone-false.svg';
import IconBtn from './Btn/IconBtn.vue';

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});
const btnRef = ref();
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const deviceSelectRef = ref();
const arrowRef = ref();
const micSrc = ref('');
micSrc.value = props.isMobile ? micMobile : micDesk;
const replaceImg = async () => {
  if (localUserInfo.value?.isAudioAvailable) {
    props.isMobile ? (micSrc.value = micMobile) : (micSrc.value = micDesk);
  } else {
    props.isMobile ? (micSrc.value = micCloseMobile) : (micSrc.value = micCloseDesk);
  }
};

const targetBoundingClientRect = ref();
const showDeviceSelect = ref(false);
const togglePopover = async () => {
  showDeviceSelect.value = !showDeviceSelect.value;
};
watch(
  () => localUserInfo.value?.isAudioAvailable,
  () => {
    replaceImg();
  },
  { deep: true, immediate: true },
);

const switchStatus = async () => {
  if (localUserInfo.value?.isAudioAvailable) {
    await TUICallKitServer.closeMicrophone();
  } else {
    await TUICallKitServer.openMicrophone();
  }
};


const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};

onMounted(() => {
  targetBoundingClientRect.value = btnRef.value?.$el?.getBoundingClientRect?.() || {};
  TUIStore.watch(StoreName.CALL, {
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  }, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  });
});
</script>

<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  overflow: hidden;

  .scroll-content {
    max-height: 60px;
    margin-right: -20px;
    overflow: hidden auto;
    padding-right: 20px;
  }
}
.camera-container {
  position: relative;
  display: flex;

  .arrow-btn {
    left: 43px;
    width: 12px;
    height: 12px;
    margin-top: 7px;
    padding: 5px 5px 5px 0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.device-select-label {
  width: 100%;
  overflow: hidden;
  padding: 5px 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  text-align: left;
  line-height: 20px;
  cursor: pointer;

  &.btn {
    border-top: 1px solid #fff3;
  }

  &:hover {
    border-radius: 5px;
    background: #ffffff52;
  }
}
</style>