<template>
  <div v-if="isShow" class="swiper-item" :style="{ left: left, top: top }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
}
</script>
<script lang="ts" setup>
import { inject, computed, ref, watch } from '../../../../adapter-vue';

const props = defineProps<{
  index: number;
}>();
const showSliderList = inject('showSliderList');
const left = ref('0px');
const top = ref('0px');

watch(() => props.index, () => {
  left.value = (props.index % 2 * 50) + '%';
  top.value = ((props.index % 4 - 1) * 187) + 'px';
}, { immediate: true });

const isShow = computed(() => {
  left.value = (props.index % 2 * 50) + '%';
  switch(props.index % 4) {
    case 0:
    case 1:
      top.value = '0px';
      break;
    case 2:
    case 3:
      top.value = '187px';
      break;
  }
  return showSliderList.value?.includes(props.index)});
</script>

<style scoped>
.swiper-item {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
  height: 187px;
}

/* 左滑动画 */
.slide-left-enter-active {
  transition: all 0.3s;
}
.slide-left-leave-active {
  transform: all 0.3s;
}
.slide-left-enter-from {
  /* opacity: 0; */
  transform: translateX(100%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(0%);
}

/* 右滑动画 */
.slide-right-enter-active {
  transition: all 0.3s;

}
.slide-right-leave-active {
  transition: all 0.3s;
  /* transform: translateX(50%); */
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>