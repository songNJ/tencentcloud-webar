<template>
  <div v-if="callStatus !== CallStatus.IDLE" id="tui-call-kit-id" :class="[bodyStyle, miniMizedDeskStyle, mobileVideoStyle, mobileAudioStyle]">
    <SingleCall v-if="!isGroupCall" class="singCall" :allowed-full-screen="allowedFullScreen"></SingleCall>
    <GroupCall v-else class="singCall"></GroupCall>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, toRefs, watchEffect } from '../adapter-vue';
import SingleCall from './components/SingleCall/SingleCall.vue';
import GroupCall from './components/GroupCall/GroupCall.vue';
import { TUIGlobal, TUIStore, StoreName, TUICallKitServer, NAME, CallStatus, CallMediaType } from '../TUICallService/index';
const isMobile = !TUIGlobal.isPC;
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const isGroupCall = ref(TUIStore.getData(StoreName.CALL, NAME.IS_GROUP));
const bodyStyle = isMobile ? 'TUICallKit-mobile transition-animation' : 'TUICallKit-desktop';
const miniMizedDeskStyle = ref('');
const mobileAudioStyle = ref('');
const mobileVideoStyle = ref('');
const isShowFloatWindow = ref(false);
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const props = withDefaults(
  defineProps<{
    beforeCalling?: (...args: any[]) => void;
    afterCalling?: (...args: any[]) => void;
    onMinimized?: (...args: any[]) => void;
    onMessageSentByMe?: (...args: any[]) => void;
    kickedOut?: (...args: any[]) => void;
    statusChanged?: (...args: any[]) => void;
    allowedMinimized?: boolean;
    allowedFullScreen?: boolean;
    videoDisplayMode?: string;
    videoResolution?: string;
  }>(),
  {
    allowedMinimized: false,
    allowedFullScreen: true,
    videoDisplayMode: 'cover',
    videoResolution: '480p',
  },
);

const { beforeCalling, afterCalling, onMinimized, onMessageSentByMe, videoDisplayMode, videoResolution, kickedOut, statusChanged, allowedMinimized } = toRefs(props);
const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleIsGroupChange = (value) => {
  isGroupCall.value = value;
};
const handleToastInfoChange = (value) => {
  if (value.text) {
    showToast(value.text, value.type || 'info');
  }
};

const handleCallMediaTypeChange = (value) => {
  callType.value = value;
  if (isMobile && isShowFloatWindow.value) {
    mobileVideoStyle.value = 'miniMized-mobile-audio';
    mobileAudioStyle.value = '';
  } 
  
  if (isMobile && !isShowFloatWindow.value) {
    mobileAudioStyle.value = 'mobile-audio';
  }
};

const handleIsMinizedChange = (value) => {
  isShowFloatWindow.value = value;
  // 开启悬浮窗
  if (value) {
    if (!isMobile) {
      miniMizedDeskStyle.value = 'miniMized';
    } else {
      if (callType.value === CallMediaType.AUDIO) {
        mobileAudioStyle.value = 'miniMized-mobile-audio';
      } else {
        mobileVideoStyle.value = 'miniMized-mobile-video';
      }
    }
  } else {
    // 关闭悬浮窗
    mobileAudioStyle.value = 'mobile-audio';
    miniMizedDeskStyle.value = '';
    mobileVideoStyle.value = '';
  }
};

const handlePermissionErrorTipChange = (data) => {
};

watchEffect(() => {
  TUICallKitServer.setCallback({
    beforeCalling: beforeCalling && beforeCalling.value,
    afterCalling: afterCalling && afterCalling.value,
    onMinimized: onMinimized && onMinimized.value,
    onMessageSentByMe: onMessageSentByMe && onMessageSentByMe.value,
    kickedOut: kickedOut && kickedOut.value,
    statusChanged: statusChanged && statusChanged.value,
  });
});

onMounted(() => {
  if(allowedMinimized.value){
    TUICallKitServer.enableFloatWindow(allowedMinimized.value)
  }
  TUICallKitServer.setVideoDisplayMode(videoDisplayMode.value as any);
  TUICallKitServer.setVideoResolution(videoResolution.value as any);
  TUIStore.watch(
    StoreName.CALL,
    {
      [NAME.CALL_STATUS]: handleCallStatusChange,
      [NAME.IS_GROUP]: handleIsGroupChange,
      [NAME.TOAST_INFO]: handleToastInfoChange,
      [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
      [NAME.SHOW_PERMISSION_TIP]: handlePermissionErrorTipChange,
    },
    {
      notifyRangeWhenWatch: NAME.MYSELF,
    },
  );
  TUIStore.watch(StoreName.CALL, {
    [NAME.IS_MINIMIZED]: handleIsMinizedChange,
  });
});

function showToast(value: string, type: string) {
  switch (type) {
    case 'info':
      uni.showToast({
        title: value,
        icon: 'none',
      });
      break;
    case 'error':
      break;
    default:
      break;
  }
}

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.CALL_STATUS]: handleCallStatusChange,
    [NAME.IS_GROUP]: handleIsGroupChange,
    [NAME.TOAST_INFO]: handleToastInfoChange,
    [NAME.IS_MINIMIZED]: handleIsMinizedChange,
    [NAME.SHOW_PERMISSION_TIP]: handlePermissionErrorTipChange,
  });
});
</script>

<style lang="scss">
.TUICallKit-mobile {

  width: 100vw;
  height: 100vh;

  .singCall {

    width: 100vw;
    height: 100vh;
  }
}

.transition-animation {
  transform: translateY(-100%);
  animation: slideInDown 0.5s ease forwards;
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.TUICallKit-desktop {
  margin: 0 auto;
  position: relative;
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  z-index: 12;
  border-radius: 16px;

  .singCall {
    width: 100%;
    height: 100%;
  }
}

.mobile-audio {
  background-color: white;
}

.miniMized {
  width: 168px !important;
  height: 56px !important;
  overflow: visible !important;
}

.miniMized-mobile-audio {
  width: 72px;
  height: 72px;
  position: fixed;
  top: 40px;
  right: 40px;
}

.miniMized-mobile-video {
  width: 40%;
  height: 30%;
  position: fixed;
  top: 40px;
  right: 40px;
}
</style>
