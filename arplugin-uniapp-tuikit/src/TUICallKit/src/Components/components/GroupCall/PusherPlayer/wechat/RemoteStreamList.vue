<template>
  <div class="invite-calling-list">
    <SwiperWeChat
      class="list-box"
      :render-stream-list="renderStreamList"
      :grid="{ rows: 2, cols: 2 }"
    >
      <SwiperSlider
        v-for="(item, index) in renderStreamList"
        :key="`${item.userId}`"
        :userid="item.userId"
        :index="index"
        class="invite-list"
      >
        <div class="invite-calling-item">
          <div
            class="invite-calling-item-message"
            v-if="!item.isEnter || callType === CallMediaType.AUDIO"
          >
            <img
              class="invite-calling-item-loading"
              v-if="!item.isEnter"
              :src="loading"
            />
            <img
              class="avatar"
              :src="item.avatar || defaultAvatar"
              :onerror="handleErrorImage"
            />
            <div class="invite-calling-item-id">{{ item.displayUserInfo }}</div>
          </div>
          <div
            :class="
              callType === CallMediaType.AUDIO
                ? 'invite-calling-audio'
                : 'invite-calling-item-stream'
            "
            v-if="item.isEnter"
          >
            <div class="pusher-box" v-if="item.userId === localUserInfo.userId">
              <WebarPusher
                class="stream"
                :custom-effect="true"
                :url="pusher.url"
                :mode="pusher.mode"
                :autopush="true"
                :enable-camera="pusher.enableCamera"
                :enable-mic="true"
                :muted="!pusher.enableMic"
                :enable-agc="true"
                :enable-ans="true"
                :enable-ear-monitor="pusher.enableEarMonitor"
                auto-focus="false"
                :zoom="pusher.enableZoom"
                :min-bitrate="pusher.minBitrate"
                :max-bitrate="pusher.maxBitrate"
                :video-width="pusher.videoWidth"
                :video-height="pusher.videoHeight"
                :beauty="pusher.beautyLevel"
                :whiteness="pusher.whitenessLevel"
                :orientation="pusher.videoOrientation"
                :aspect="pusher.videoAspect"
                :device-position="pusher.frontCamera"
                :remote-mirror="pusher.enableRemoteMirror"
                :local-mirror="pusher.localMirror"
                :background-mute="pusher.enableBackgroundMute"
                :audio-quality="pusher.audioQuality"
                :audio-volume-type="pusher.audioVolumeType"
                :audio-reverb-type="pusher.audioReverbType"
                :waiting-img="pusher.waitingImage"
                :beauty-style="pusher.beautyStyle"
                :filter="pusher.filter"
                :licenseKey="licenseKey"
                :appId="appid"
                :authFunc="authFunc"
                @statechange="pusherStateChangeHandler"
                @netstatus="pusherNetStatus"
                @error="pusherErrorHandler"
                @audiovolumenotify="pusherAudioVolumeNotify"
              ></WebarPusher>
              <div
                v-if="callType !== CallMediaType.AUDIO"
                class="invite-calling-item-id"
              >
                {{ item.nick || item.userId }}
              </div>
            </div>
            <div class="player-container" v-else>
              <live-player
                class="player"
                v-if="
                  playerProcess[item.userId] &&
                  playerProcess[item.userId].userID === item.userId &&
                  (playerProcess[item.userId].hasAudio ||
                    playerProcess[item.userId].hasVideo)
                "
                :id="playerProcess[item.userId].id"
                :data-userid="playerProcess[item.userId].userID"
                :data-streamid="playerProcess[item.userId].streamID"
                :data-streamtype="playerProcess[item.userId].streamType"
                :src="playerProcess[item.userId].src"
                mode="RTC"
                :autoplay="playerProcess[item.userId].autoplay"
                :mute-audio="playerProcess[item.userId].muteAudio"
                :mute-video="playerProcess[item.userId].muteVideo"
                :orientation="playerProcess[item.userId].orientation"
                :object-fit="playerProcess[item.userId].objectFit"
                :background-mute="
                  playerProcess[item.userId].enableBackgroundMute
                "
                :min-cache="playerProcess[item.userId].minCache"
                :max-cache="playerProcess[item.userId].maxCache"
                :sound-mode="soundMode"
                :enable-recv-message="
                  playerProcess[item.userId].enableRecvMessage
                "
                :auto-pause-if-navigate="
                  playerProcess[item.userId].autoPauseIfNavigate
                "
                :auto-pause-if-open-native="
                  playerProcess[item.userId].autoPauseIfOpenNative
                "
                @statechange="playerStateChange"
                @fullscreenchange="playerFullscreenChange"
                @netstatus="playNetStatus"
                @audiovolumenotify="playerAudioVolumeNotify"
              />
              <div
                v-if="callType !== CallMediaType.AUDIO"
                class="invite-calling-item-id"
              >
                {{ item.displayUserInfo }}
              </div>
            </div>
          </div>
        </div>
      </SwiperSlider>
    </SwiperWeChat>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from "../../../../../adapter-vue";
import SwiperWeChat from "../../../common/SwiperWx/Swiper.vue";
import SwiperSlider from "../../../common/SwiperWx/SwiperSlider.vue";
import {
  TUICallKitServer,
  StoreName,
  NAME,
  TUIStore,
  CallMediaType,
  AudioPlayBackDevice,
} from "../../../../../TUICallService/index";
import loading from "../../../../assets/mobile/loading.png";
import defaultAvatar from "../../../../assets/mobile/default_avatar.png";
import {
  LICENSE_KEY,
  APP_ID,
  authFunc as auth,
} from "../../../../../../debug/webar-auth";
const pusher = ref(TUIStore.getData(StoreName.CALL, NAME.PUSHER));
const playerList = ref(TUIStore.getData(StoreName.CALL, NAME.PLAYER));
const soundMode = ref(
  TUIStore.getData(StoreName.CALL, NAME.IS_EAR_PHONE)
    ? AudioPlayBackDevice.EAR
    : AudioPlayBackDevice.SPEAKER
);
const playerProcess = ref({});
const licenseKey = ref(LICENSE_KEY);
const appid = ref(APP_ID);
const authFunc = ref(auth);
const props = defineProps({
  remoteList: {
    type: Array,
    required: true,
  },
  callStatus: {
    type: String,
    required: true,
  },
  localUserInfo: {
    type: Object,
    required: true,
  },
  callType: {
    type: Number,
    required: true,
  },
});

const handlePusherChange = (value) => {
  Object.assign(pusher.value, value);
};

const handlePlayerChange = (value) => {
  Object.assign(playerList.value, value);
  playerProcess.value = convertToObj(playerList.value);
};

const handEarPhoneChange = (value) => {
  soundMode.value = value
    ? AudioPlayBackDevice.EAR
    : AudioPlayBackDevice.SPEAKER;
};

const watchOptions = {
  [NAME.PUSHER]: handlePusherChange,
  [NAME.PLAYER]: handlePlayerChange,
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

const renderStreamList = computed(() => {
  return [props.localUserInfo, ...props.remoteList];
});

function convertToObj(arr = []) {
  const tempObject = {};
  for (let i = 0; i < arr.length; i++) {
    tempObject[arr[i].userID] = arr[i];
  }
  return tempObject;
}

function handleErrorImage(e: any) {
  e.target.src = defaultAvatar;
}

function pusherStateChangeHandler(e: any) {
  TUICallKitServer._tuiCallEngine._pusherStateChangeHandler(e);
}

function pusherNetStatus(e: any) {
  TUICallKitServer._tuiCallEngine._pusherNetStatus(e);
}

function pusherErrorHandler(e: any) {
  TUICallKitServer._tuiCallEngine._pusherNetStatus(e);
}

function pusherAudioVolumeNotify(e: any) {
  TUICallKitServer._tuiCallEngine._pusherAudioVolumeNotify(e);
}

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

<style lang="scss" scoped>
.invite-list {
  width: 100%;
  height: 187px;
}
.invite-calling-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;

  .list-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;

    .invite-calling-item {
      width: 100%;
      height: 187px;

      .invite-calling-item-message {
        width: 100%;
        height: 100%;
        position: relative;

        .invite-calling-item-loading {
          position: absolute;
          left: calc(50% - 20px);
          top: calc(50% - 20px);
          width: 40px;
          height: 40px;
          animation: rotation 2s linear infinite;
        }

        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .avatar {
          width: 100%;
          height: 100%;
        }

        .invite-calling-item-id {
          position: absolute;
          left: 2%;
          bottom: 2%;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
        }
      }

      .invite-calling-audio {
        width: 0px;
        height: 0px;

        .pusher-box {
          width: 0px;
          height: 0px;
          .pusher {
            width: 0px;
            height: 0px;
          }
        }
        .player-container {
          width: 0px;
          height: 0px;

          .player {
            width: 0px;
            height: 0px;
          }
        }
      }

      .invite-calling-item-stream {
        width: 100%;
        height: 100%;
        .pusher-box {
          width: 100%;
          height: 100%;
          .pusher {
            width: 100%;
            height: 100%;
          }
          .invite-calling-item-id {
            position: absolute;
            left: 2%;
            bottom: 2%;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
          }
        }
        .player-container {
          width: 100%;
          height: 100%;
          background-color: black;

          .player {
            width: 100%;
            height: 100%;
          }
          .invite-calling-item-id {
            position: absolute;
            left: 2%;
            bottom: 2%;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
