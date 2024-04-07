<template>
  <div
    v-if="isShow"
    class="popover-container"
    :style="popoverStyle"
  >
    <div class="body">
      <slot></slot>
    </div>
    <div class="triangle"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from '../../../../adapter-vue';

const PopoverWidth = 180;

interface TBoundingClientRect {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

const props = defineProps<{
  showPopover: boolean,
  targetBoundingClientRect: TBoundingClientRect,
  width?: number;
}>();

const isShow = ref(false);
const popoverStyle = ref();

watch(
  () => props.showPopover,
  () => {
    isShow.value = props.showPopover;
  },
);
watch(
  () => props.targetBoundingClientRect,
  () => {
    const { width, height } = props.targetBoundingClientRect;
    popoverStyle.value = {
      left: `${( width / 2 - PopoverWidth / 2 )}px`,
      bottom: `${( height + 10 )}px`,
    };
  },
);
</script>

<style lang="scss" scoped>
.popover-container {
  position: absolute;
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .body {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    background-color: #6b758a82;
    text-overflow: ellipsis;
    backdrop-filter: blur(20px);
    color: #fff;
    z-index: 10;
  }
  .triangle {
    width: 6px;
    height: 6px;
    background-color: #6b758a82;
    backdrop-filter: blur(20px);
    transform: rotate(45deg);
    margin-top: -3px;
  }
}
</style>