<template>
  <Popover
    v-if="!isMobile"
    class="device-select-container"
    :showPopover="showDeviceSelect"
    :targetBoundingClientRect="targetBoundingClientRect"
  >
    <div class="scroll-container">
      <div class="scroll-content">
        <div
          class="device-select-label"
          v-for="device in deviceList"
          :class="device.deviceId === currentDeviceId ? 'select' : ''"
          :key="device.deviceId"
          @click="() => switchDevice(device.deviceId)"
        >
          <span>
            {{ device.label }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="device-select-label btn"
      @click="switchStatus"
    >
      <span>{{ t(toggleBtnText) }}</span>
    </div>
  </Popover>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from '../../../../adapter-vue';
import { TUICallKitServer, TUIStore, StoreName, NAME, t } from '../../../../TUICallService/index';
import Popover from '../Popover/Popover.vue';
import { DeviceType } from '../../../../TUICallService/const/call';

const props = defineProps<{
  isMobile: boolean;
  deviceType: DeviceType;
  targetBoundingClientRect: any;
  showDeviceSelect?: boolean;
}>();

const toggleBtnText = ref('');
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const deviceList = ref(TUIStore.getData(StoreName.CALL, NAME.DEVICE_LIST));
const currentDeviceId = ref('');

watch(
  () => { 
    return props.deviceType === DeviceType.MICROPHONE
      ? localUserInfo.value?.isAudioAvailable
      : localUserInfo.value?.isVideoAvailable;
  },
  () => {
    const currentDeviceStatus =
      props.deviceType === DeviceType.MICROPHONE
        ? localUserInfo.value?.isAudioAvailable
        : localUserInfo.value?.isVideoAvailable;
    const operaText = currentDeviceStatus ? 'close' : 'open';
    toggleBtnText.value = `${operaText} ${props.deviceType}`;
  },
  { deep: true, immediate: true },
);

const switchStatus = async () => {
  if (props.deviceType === DeviceType.CAMERA) {
    if (localUserInfo.value?.isVideoAvailable) {
      await TUICallKitServer.closeCamera();
    } else {
      await TUICallKitServer.openCamera("localVideo");
    }
  }

  if (props.deviceType === DeviceType.MICROPHONE) {
    if (localUserInfo.value?.isAudioAvailable) {
      await TUICallKitServer.closeMicrophone();
    } else {
      await TUICallKitServer.openMicrophone();
    }
  }
};
const switchDevice = async (deviceId) => {
  try {
    await TUICallKitServer.switchDevice({
      deviceType: props.deviceType === DeviceType.CAMERA ? 'video' : 'audio',
      deviceId,
    });
    
    currentDeviceId.value = deviceId;
  } catch (err) {
    console.error(err);
  }
};
const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};
const handleDeviceListChange = (value) => {
  if (props.deviceType === DeviceType.CAMERA) {
    deviceList.value = value?.cameraList || [];
    currentDeviceId.value = value?.currentCamera?.deviceId || '';
  } else if (props.deviceType === DeviceType.MICROPHONE) {
    currentDeviceId.value = value?.currentMicrophone?.deviceId || '';
    deviceList.value = value?.microphoneList || [];
  }
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, {
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
    [NAME.DEVICE_LIST]: handleDeviceListChange,
  }, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
    [NAME.DEVICE_LIST]: handleDeviceListChange,
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

  &.select {
    background-color: #0f101433;
    border-radius: 3px;
  }
}
</style>
