<template>
  <div class="camera-container">
    <IconBtn
      ref="btnRef"
      :icon="cameraSrc"
      :text="t('camera')"
      :isMobile="isMobile"
      @click="switchStatus"
    >
    </IconBtn>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from '../../../../adapter-vue';
import { TUICallKitServer, TUIStore, StoreName, NAME, t } from '../../../../TUICallService/index';
import IconBtn from './Btn/IconBtn.vue';
import { DeviceType } from '../../../../TUICallService/const/call';
import cameraMobile from '../../../assets/mobile/camera-true.png';
import cameraCloseMobile from '../../../assets/mobile/camera-false.png';
import cameraDesk from '../../../assets/desktop/camera.svg';
import cameraCloseDesk from '../../../assets/desktop/camera-false.svg';

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
});
const btnRef = ref();
const cameraSrc = ref('');
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const deviceSelectRef = ref();
const arrowRef = ref();
cameraSrc.value = props.isMobile ? cameraMobile : cameraDesk;
const targetBoundingClientRect = ref();
const showDeviceSelect = ref(false);
const togglePopover = async () => {
  showDeviceSelect.value = !showDeviceSelect.value;
};

const replaceImg = async () => {
  if (localUserInfo.value?.isVideoAvailable) {
    props.isMobile ? (cameraSrc.value = cameraMobile) : (cameraSrc.value = cameraDesk);
  } else {
    props.isMobile ? (cameraSrc.value = cameraCloseMobile) : (cameraSrc.value = cameraCloseDesk);
  }
};
watch(
  () => localUserInfo.value?.isVideoAvailable,
  () => {
    replaceImg();
  },
  { deep: true, immediate: true },
);

const switchStatus = async () => {
  if (localUserInfo.value?.isVideoAvailable) {
    await TUICallKitServer.closeCamera();
  } else {
    await TUICallKitServer.openCamera("localVideo");
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