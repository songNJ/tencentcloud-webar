<template>
  <div class="function-buttons">
    <div v-if="allowedMinimized" class="minimize" @click="toggleMinimize">
      <img :src="MinimizeSVG" />
    </div>
    <div v-if="allowedFullScreen" class="minimize" @click="toggleFullscreen">
      <img :src="fullScreenSVG" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MinimizeSVG from '../../../assets/desktop/minimize.svg';
import fullScreenSVG from '../../../assets/desktop/fullScreen.svg';
const emit = defineEmits(['openFloatWindow']);
function toggleMinimize() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  emit('openFloatWindow');
}

const props = defineProps({
  allowedFullScreen: {
    type: Boolean,
    required: true,
  },
  allowedMinimized: {
    type: Boolean,
    required: true,
  },
});

function toggleFullscreen() {
  const elem = document.getElementById('tui-call-kit-id') as HTMLElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}
</script>

<style scoped>
.minimize {
  margin-left: 10px;
}
</style>
