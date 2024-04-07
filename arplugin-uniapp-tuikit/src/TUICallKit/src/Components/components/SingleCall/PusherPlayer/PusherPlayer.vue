<template>
  <div class="streamBox">
    <!-- 移动端 -->
    <div v-show="callType === CallMediaType.VIDEO" v-if="isMobile" class="streamBox-mobile" @click="toggleMinimize">
      <!-- 本地流 -->
      <div id="localVideo" :class="localClass" @click="switchScreen(currentLocalScreen ? remoteList[0].domId:'localVideo',localClass)"></div>
      <!-- 远端流 -->
      <div v-if="remoteList.length !== 0" :id="remoteList[0].domId" :class="remoteClass" @click="switchScreen(currentLocalScreen ? remoteList[0].domId:'localVideo',remoteClass)"></div>
      <div v-if="isShowFloatWindow" class="callDuration-text">{{ callStatus !== CallStatus.CONNECTED ? t('waiting') : callDuration }}</div>
    </div>

    <!-- 桌面端 -->
    <div v-show="callType === CallMediaType.VIDEO" v-if="!isMobile" class="streamBox-deskTop" :class="localUserInfo.isVideoAvailable ? 'streamDisplay' : '' ">
      <div id="localVideo" :class="localClass">
        <span v-if="callStatus === CallStatus.CONNECTED" class="tag">
          <div class="microphone-icon-container">
            <MicVolume v-if="localUserInfo.isAudioAvailable" :volume="localUserInfo.volume"></MicVolume>
            <MicVolumeClosed v-else />
          </div>
         <div class="stream-userInfo">{{`${localUserInfo.displayUserInfo} ${t('me')}` }}</div> 
        </span>
      </div>
      <div v-if="showRemoteStream" :class="remoteClass">
        <div :id="remoteList[0].domId" class="remoteListBox">
          <span class="tag">
            <div class="microphone-icon-container">
              <MicVolume v-if="remoteList[0].isAudioAvailable" :volume="remoteList[0].volume"></MicVolume>
              <MicVolumeClosed v-else />
            </div>
           <div class="stream-userInfo">{{ remoteList[0].displayUserInfo }}</div>  
          </span>
        </div>
      </div>
      <div v-if="showSwitchScreen" class="switchScreenBox" @click="switchScreen(currentLocalScreen ? remoteList[0].domId:'localVideo')">
        <div class="screenImg">
          <img :src="switchScreenImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from '../../../../adapter-vue';
import { TUIGlobal, TUIStore, StoreName, NAME, t, CallMediaType, CallStatus, TUICallKitServer } from '../../../../TUICallService/index';
import switchScreenImg from '../../../assets/desktop/switchScreen.svg';
import MicVolume from '../../common/MicVolume/MicVolume.vue';
import MicVolumeClosed from '../../common/MicVolume/MicVolumeClosed.vue';
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const localClass = ref('largeView');
const remoteClass = ref('smallView');
const currentLocalScreen = ref(true);
const remoteList = ref(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const callDuration = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));
const isSwitchScreen = ref<Boolean>(false);
const isShowFloatWindow = ref<Boolean>(false);
const showRemoteStream = ref<Boolean>(false)
const isMobile = !TUIGlobal.isPC;
const showSwitchScreen = computed(() => {
  return callStatus.value === CallStatus.CONNECTED && remoteList.value.length !== 0 && callType.value === CallMediaType.VIDEO;
});

const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};
const handleRemoteUserInfoListChange = (value) => {
  showRemoteStream.value = value[0]?.isEnter;
  remoteList.value = value;
};
const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleCallMediaTypeChange = (value) => {
  callType.value = value;
};

const handleIsShowFloatWindowChange = (value) => {
  isShowFloatWindow.value = value;
};

const toggleMinimize = () => {
  if (callType.value === CallMediaType.AUDIO || !isShowFloatWindow.value) return;
  TUICallKitServer.toggleMinimize();
};

const handleCallDurationChange = (value) => {
  callDuration.value = value;
};

const handleScreenChange = (value) => {
  if (!value) return;
  if (value === 'localVideo') {
    localClass.value = 'largeView';
    remoteClass.value = 'smallView';
    currentLocalScreen.value = true;
  } else {
    remoteClass.value = 'largeView';
    localClass.value = 'smallView';
    currentLocalScreen.value = false;
  }
};

const watchOptions = {
  [NAME.IS_MINIMIZED]: handleIsShowFloatWindowChange,
  [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  [NAME.REMOTE_USER_INFO_LIST]: handleRemoteUserInfoListChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  [NAME.CALL_DURATION]: handleCallDurationChange,
  [NAME.BIG_SCREEN_USER_ID]: handleScreenChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});


const switchScreen = (value,className) => {
  if( callStatus.value !== CallStatus.CONNECTED || (isMobile && className === 'largeView')) return;
  TUICallKitServer.switchScreen(value);
};
</script>

<style lang="scss">
.streamDisplay {
  .remoteListBox, .remoteList-desk, .localVideo {
    > div {
      background-color: #4c515a !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.streamBox {
  width: 100%;
  height: 100%;

  .callDuration-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #ffffff;
    font-family: PingFang SC;
    font-weight: 500px;
    line-height: 20px;
  }
}
.streamBox-mobile {
  position: relative;
  height: 100%;

  .smallView {
    position: fixed;
    top: 8%;
    right: 10%;
    z-index: 999;
    width: 40%;
    height: 30%;

    .remoteListBox {
      width: 40%;
      height: 30%;
    }
  }

  .largeView {
    width: 100%;
    height: 100%;
  }
}

.streamBox-deskTop {
  position: relative;
  width: 100%;
  height: 100%;
  .switchScreenBox {
    cursor: pointer;
    position: absolute;
    top: 20px;
    left: 260px;
    z-index: 999;

    .screenImg {
      width: 16px;
    }
  }

  .largeView {
    width: 100%;
    height: 100%;

    .remoteListBox{
      width: 100%;
      height: 100%;
    }
  }

  .smallView {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 260px;
    height: 180px;
    z-index: 999;
    background-color: black;

    .remoteListBox {
      width: 100%;
      height: 100%;
    }
  }

  .tag {
    color: white;
    z-index: inherit;
    background: rgba(0, 0, 0, 0.6);
    padding: 2px 10px;
    border-top-right-radius: inherit;
    border-bottom-left-radius: inherit;
    font-size: 14px;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 11;
    display: flex;
    align-items: center;

   .microphone-icon-container {
      margin-left: 0;
      margin-right: 2px;
      width: 20px;
      background-color: transparent;
    }

    .stream-userInfo {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      white-space: nowrap;
    }
  }
}
</style>
