<template>
  <!-- 移动端 -->
  <div v-show="callType === CallMediaType.VIDEO" @click="toggleMinimize" class="streamBox-mobile">
    <!-- 本地流 -->
    <Pusher :localClass="localClass" :currentLocalScreen="currentLocalScreen"></Pusher>
    <!-- 远端流 -->
    <Player v-if="callStatus === CallStatus.CONNECTED" :remoteClass="remoteClass" :currentLocalScreen="currentLocalScreen"></Player>
    <div v-if="isShowFloatWindow" class="callDuration-text">{{callStatus !== CallStatus.CONNECTED ? t('waiting') :callDuration}}</div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '../../../../adapter-vue';
import { TUICallKitServer, TUIStore, StoreName, NAME, CallMediaType, CallStatus, t } from '../../../../TUICallService/index';
import Pusher from './wechat/Pusher.vue';
import Player from './wechat/Player.vue';
const localClass = ref('large-view');
const remoteClass = ref('small-view');
const currentLocalScreen = ref(true);
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const callDuration = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));
const isShowFloatWindow = ref(false);

const handleCallMediaTypeChange = (value) => {
  callType.value = value;
};

const handleIsShowFloatWindowChange = (value) => {
  isShowFloatWindow.value = value;
};

const toggleMinimize = () =>{
  if( callType.value === CallMediaType.AUDIO || !isShowFloatWindow.value ) return;
  TUICallKitServer.toggleMinimize();
}

const handleCallStatusChange = (value) => {
  callStatus.value = value;
};

const handleCallDurationChange = (value) => {
  callDuration.value = value;
};

const handleScreenChange = (value) => {
  if (!value) return;
  if (value === 'localVideo') {
    localClass.value = 'large-view';
    remoteClass.value = 'small-view';
    currentLocalScreen.value = true;
  } else {
    remoteClass.value = 'large-view';
    localClass.value = 'small-view';
    currentLocalScreen.value = false;
  }
};


const watchOptions = {
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  [NAME.IS_MINIMIZED]: handleIsShowFloatWindowChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.CALL_DURATION]: handleCallDurationChange,
  [NAME.BIG_SCREEN_USER_ID]: handleScreenChange,
};

onMounted(function () {
  TUIStore.watch(
    StoreName.CALL,watchOptions,
    {
      notifyRangeWhenWatch: NAME.MYSELF,
    },
  );
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});

</script>
  
<style lang="scss" scoped>
.streamBox-mobile {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;

  .callDuration-text{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #FFFFFF;
    font-family: PingFang SC;
    font-weight: 500px;
    line-height: 20px;
  }
}
</style>
  