<template>
  <div class="zoom-box" @click="toggleMinimize">
    <img class="zoom-img" :src="zoomSrc" />
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, onMounted, ref } from '../../../../adapter-vue';
import zoomVideo from '../../../assets/mobile/zoom_out_video.svg';
import zoomAudio from '../../../assets/mobile/zoom_out_audio.svg';
import { TUICallKitServer, CallMediaType, TUIStore, StoreName, NAME,} from '../../../../TUICallService/index';
const props = defineProps({
  isGroupCall: {
    type: Boolean,
    required: true,
  },
  callType: {
    type: Number,
    required: true,
  },
});

let zoomSrc = ref(props.isGroupCall || props.callType === CallMediaType.AUDIO ? zoomAudio : zoomVideo);
function toggleMinimize() {
  TUICallKitServer.toggleMinimize();
}

onMounted(() => {
  TUIStore.watch(StoreName.CALL, {
    [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  }, {
    notifyRangeWhenWatch: NAME.MYSELF,
  });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  });
});

const handleCallMediaTypeChange = (value) =>{
  zoomSrc.value = (value === CallMediaType.AUDIO ? zoomAudio : zoomVideo);
}

</script>

<style lang="scss" scoped>
.zoom-box {
  display: block;
  width: 20px;
  height: 20px;

  .zoom-img {
    width: 100%;
    height: 100%;
  }
}
</style>