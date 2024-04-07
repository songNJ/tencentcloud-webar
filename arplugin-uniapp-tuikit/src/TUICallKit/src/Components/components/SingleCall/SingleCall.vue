<template>
  <div :class="bodyStyle">
    <!-- 移动端主窗口 -->
    <div v-if="isMobile" :class="['singleCall-mobile', videoStyle]">
      <div
        v-if="
          (callStatus === CallStatus.CALLING ||
            callType === CallMediaType.AUDIO) &&
          !isShowFloatWindow
        "
        class="inviteHeader"
      >
        <InviteInfo></InviteInfo>
      </div>
      <PusherPlayer v-if="!isWeChat"></PusherPlayer>
      <WeChatStream class="live-pusher" v-else></WeChatStream>
      <BtnOperate
        v-if="!isShowFloatWindow"
        class="btnOperate btn-operate-mobile"
      ></BtnOperate>
    </div>

    <!-- 桌面端主窗口 -->
    <div
      v-if="!isMobile"
      v-show="!isShowFloatWindow"
      :class="['singleCall-desktop', videoStyle]"
    >
      <ToggleSize
        class="toggleSize"
        :allowed-full-screen="allowedFullScreen"
        :allowed-minimized="allowedMinimizedRef"
        @openFloatWindow="handOpenWindow"
      ></ToggleSize>
      <div
        v-if="
          callStatus === CallStatus.CALLING || callType === CallMediaType.AUDIO
        "
        class="inviteHeader"
      >
        <InviteInfo></InviteInfo>
      </div>
      <PusherPlayer></PusherPlayer>
      <BtnOperate class="btnOperate"></BtnOperate>
    </div>

    <!-- 桌面端顶部菜单栏  -->
    <div class="topToolbar-desk" v-if="!isMobile">
      <Timer
        v-if="callStatus === CallStatus.CONNECTED && !isShowFloatWindow"
        class="topToolbar-time"
        :call-duration="callDuration"
      ></Timer>
      <FloatWindowDesk
        v-if="isShowFloatWindow"
        :local-user-info="localUserInfo"
        :callStatus="callStatus"
        :callRole="callRole"
        @closeFloatWindow="handCloseWindow"
      ></FloatWindowDesk>
    </div>

    <!-- 移动端顶部菜单栏 -->
    <div
      :class="
        isShowFloatWindow
          ? 'topToolbar-mobile-floatWindow'
          : 'topToolbar-mobile'
      "
      v-if="isMobile"
    >
      <ZoomOut
        v-if="allowedMinimizedRef && !isShowFloatWindow"
        :isGroupCall="isGroupCall"
        :callType="callType"
      ></ZoomOut>
      <FloatWindowMobile
        v-if="
          isShowFloatWindow && (callType === CallMediaType.AUDIO || isGroupCall)
        "
      ></FloatWindowMobile>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, onUnmounted } from "../../../adapter-vue";
import InviteInfo from "./InviteInfo/InviteInfo.vue";
import BtnOperate from "./BtnOperate/BtnOperate.vue";
import PusherPlayer from "./PusherPlayer/PusherPlayer.vue";
import WeChatStream from "./PusherPlayer/WeChatStream.vue";
import FloatWindowDesk from "../common/FloatWindow/desktop/FloatWindow.vue";
import FloatWindowMobile from "../common/FloatWindow/mobile/FloatWindow.vue";
import ToggleSize from "../common/Button/ToggleSize.vue";
import Timer from "../common/Button/Timer.vue";
import ZoomOut from "../common/Button/ZoomOut.vue";
import {
  TUIGlobal,
  TUIStore,
  StoreName,
  TUICallKitServer,
  NAME,
  CallStatus,
  CallMediaType,
} from "../../../TUICallService/index";
const isMobile = !TUIGlobal.isPC;
const isWeChat = TUIGlobal.isWeChat;
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const videoStyle = ref(
  !isWeChat && callType.value === CallMediaType.VIDEO
    ? "videoStyle"
    : "audioStyle"
);
const bodyStyle = ref(isWeChat ? "weChatBody" : "");
const isShowFloatWindow = ref(false);
const localUserInfo = ref(
  TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO)
);
const callDuration = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));
const isGroupCall = ref(TUIStore.getData(StoreName.CALL, NAME.IS_GROUP));
const allowedMinimizedRef = ref(
  TUIStore.getData(StoreName.CALL, NAME.ENABLE_FLOAT_WINDOW)
);
const callRole = ref<string>(TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE));
const props = defineProps({
  allowedFullScreen: {
    type: Boolean,
    required: true,
  },
});

const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleCallMediaTypeChange = (value) => {
  callType.value = value;
  if (isWeChat) return;
  videoStyle.value = callType.value === CallMediaType.VIDEO ? "videoStyle" : "";
};
const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};
const handleIsShowFloatWindowChange = (value) => {
  isShowFloatWindow.value = value;
};
const handleCallDurationChange = (value) => {
  callDuration.value = value;
};

function handOpenWindow() {
  TUICallKitServer.toggleMinimize();
}

function handCloseWindow() {
  TUICallKitServer.toggleMinimize();
}

function handleEnableFloatWindowChange(value) {
  allowedMinimizedRef.value = value;
}

const handleCallRoleChange = (value) => {
  callRole.value = value;
};

onMounted(function () {
  TUIStore.watch(
    StoreName.CALL,
    {
      [NAME.CALL_STATUS]: handleCallStatusChange,
      [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
      [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
      [NAME.IS_MINIMIZED]: handleIsShowFloatWindowChange,
      [NAME.CALL_DURATION]: handleCallDurationChange,
      [NAME.ENABLE_FLOAT_WINDOW]: handleEnableFloatWindowChange,
      [NAME.CALL_ROLE]: handleCallRoleChange,
    },
    {
      notifyRangeWhenWatch: NAME.MYSELF,
    }
  );
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.CALL_STATUS]: handleCallStatusChange,
    [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
    [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
    [NAME.IS_MINIMIZED]: handleIsShowFloatWindowChange,
    [NAME.CALL_DURATION]: handleCallDurationChange,
    [NAME.ENABLE_FLOAT_WINDOW]: handleEnableFloatWindowChange,
    [NAME.CALL_ROLE]: handleCallRoleChange,
  });
});
</script>

<style lang="scss" scoped>
.btn-operate-mobile {
  z-index: 99;
}
.videoStyle {
  background: #00183c;
}
.audioStyle {
  position: absolute;
  background-color: white;
}

.singleCall-mobile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;

  .inviteHeader {
    width: 100%;
    position: fixed;
    top: 107px;
    z-index: 99;
  }

  .live-pusher {
    width: 100%;
    height: 100%;
  }
}

.singleCall-desktop {
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 0;
  background: #00183c;
  position: relative;

  .toggleSize {
    position: absolute;
    right: 12px;
    top: 12px;
    z-index: 13;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .inviteHeader {
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    z-index: 99;
  }
}

.topToolbar-desk {
  position: absolute;
  top: 40px;
  transform: translate(-50%, -50%);
  left: 50%;
  .topToolbar-time {
    font-size: 16px;
    font-weight: 500;
  }
}
.topToolbar-mobile {
  position: absolute;
  top: 30px;
  left: 20px;
  z-index: 99;
}
.topToolbar-mobile-floatWindow {
  position: absolute;
  z-index: 99;
}

.weChatBody {
  width: 100%;
  height: 100%;
}
</style>
