<template>
  <div class="swiper-item" name="swiper-silder">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  index: number;
}>();

</script>

<style scoped>
.swiper-item {
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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