<template>
  <div class="float-control-panel">
    <div class="float-control-item-icon">
      <div class="float-control-item-icon-container" @click="hangup">
        <img :src="FloatCallEnd" />
      </div>
    </div>
    <div class="float-control-item-icon">
      <div class="float-control-item-icon-container" @click="toggleMicrophone">
        <img v-if="localUserInfo.isAudioAvailable" :src="FloatMicrophoneSVG" />
        <img v-else :src="FloatMicrophoneClosedSVG" />
      </div>
    </div>
    <div class="float-control-item-icon">
      <div class="float-control-item-icon-container" @click="toggleMinimize">
        <img :src="FloatFullScreenSVG" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '../../../../../adapter-vue';
import { TUICallKitServer, CallRole, CallStatus } from '../../../../../TUICallService/index';
import FloatCallEnd from '../../../../assets/desktop/floatCallEnd.svg';
import FloatMicrophoneSVG from '../../../../assets/desktop/floatMicrophone.svg';
import FloatMicrophoneClosedSVG from '../../../../assets/desktop/floatMicrophoneClosed.svg';
import FloatFullScreenSVG from '../../../../assets/desktop/floatFullScreen.svg';
const emit = defineEmits(['closeFloatWindow']);
const isOpen = ref(true);

const props = defineProps({
  localUserInfo: {
    type: Object,
    required: true,
  },
  callStatus: {
    type: String,
    required: true,
  },
  callRole: {
    type: String,
    required: true,
  }
});

function toggleMinimize() {
  emit('closeFloatWindow');
}

async function hangup() {
  if(props.callRole === CallRole.CALLEE && props.callStatus === CallStatus.CALLING){
    await TUICallKitServer.reject()
  } else {
    await TUICallKitServer.hangup();
  }
}

async function toggleMicrophone() {
  if (isOpen.value) {
    await TUICallKitServer.closeMicrophone();
    isOpen.value = false;
  } else {
    await TUICallKitServer.openMicrophone();
    isOpen.value = true;
  }
}
</script>

<style scoped>
.float-control-panel {
  width: 168px;
  height: 56px;
  background: white;
  z-index: 13;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.float-control-item-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;
  position: relative;
}

.float-control-item-icon-container {
  border-radius: 40px;
  width: 40px;
  height: 40px;

  margin: 0.5rem;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.float-control-item-icon-container:hover {
  background: rgba(218, 218, 218, 0.3);
}
</style>
