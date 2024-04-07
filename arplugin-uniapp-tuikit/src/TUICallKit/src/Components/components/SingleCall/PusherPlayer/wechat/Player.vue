<template>
  <div :class="remoteClass">
    <div
      v-for="(item, index) in playerList"
      :key="index"
      @click="switchScreen"
      class="stream-box"
    >
      <live-player
        v-if="item.hasAudio || item.hasVideo"
        class="stream"
        :id="item.id"
        :data-userid="item.userID"
        :data-streamid="item.streamID"
        :data-streamtype="item.streamType"
        :src="item.src"
        mode="RTC"
        :autoplay="item.autoplay"
        :mute-audio="item.muteAudio"
        :mute-video="item.muteVideo"
        :orientation="item.orientation"
        :object-fit="item.objectFit"
        :background-mute="item.enableBackgroundMute"
        :min-cache="item.minCache"
        :max-cache="item.maxCache"
        :sound-mode="soundMode"
        :enable-recv-message="item.enableRecvMessage"
        :auto-pause-if-navigate="item.autoPauseIfNavigate"
        :auto-pause-if-open-native="item.autoPauseIfOpenNative"
        @statechange="playerStateChange"
        @fullscreenchange="playerFullscreenChange"
        @netstatus="playNetStatus"
        @audiovolumenotify="playerAudioVolumeNotify"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TUICallKitServer,
  StoreName,
  NAME,
  TUIStore,
  CallStatus,
  AudioPlayBackDevice,
} from "../../../../../TUICallService/index";
import { onMounted, ref, onUnmounted } from "../../../../../adapter-vue";
const playerList = ref(TUIStore.getData(StoreName.CALL, NAME.PLAYER));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const soundMode = ref(
  TUIStore.getData(StoreName.CALL, NAME.IS_EAR_PHONE)
    ? AudioPlayBackDevice.EAR
    : AudioPlayBackDevice.SPEAKER
);
const props = defineProps({
  remoteClass: {
    type: String,
    required: true,
  },
  currentLocalScreen: {
    type: Boolean,
    required: true,
  },
});

const handlePlayerListChange = (value) => {
  playerList.value = Object.assign({}, playerList.value, value);
};

const handleCallStatusChange = (value) => {
  callStatus.value = value;
};

const handEarPhoneChange = (value) => {
  soundMode.value = value
    ? AudioPlayBackDevice.EAR
    : AudioPlayBackDevice.SPEAKER;
};

const watchOptions = {
  [NAME.PLAYER]: handlePlayerListChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.IS_EAR_PHONE]: handEarPhoneChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});

const switchScreen = (value, className) => {
  if (
    callStatus.value !== CallStatus.CONNECTED ||
    props.remoteClass === "large-view"
  )
    return;
  TUICallKitServer.switchScreen(
    props.currentLocalScreen ? "player" : "localVideo"
  );
};

function playerStateChange(e: any) {
  TUICallKitServer._tuiCallEngine._playerStateChange(e);
}

function playerFullscreenChange(e: any) {
  // TUICallKitServer._tuiCallEngine._playNetStatus(e);
}

function playNetStatus(e: any) {
  TUICallKitServer._tuiCallEngine._playNetStatus(e);
}

function playerAudioVolumeNotify(e: any) {
  TUICallKitServer._tuiCallEngine._playerAudioVolumeNotify(e);
}
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
