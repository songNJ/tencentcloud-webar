<template>
  <div class="swipe" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <div class="swiper-sliders-container">
      <slot />
    </div>

    <!--左右滑动控制栏 -->
    <div v-if="showTurnPageControl" class="swipe-dots-container">
      <span v-for="item in pageArr" :key="item" class="swipe-dots" :class="[currentIndex === item ? 'swipe-current-dots' : '']"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from '../../../../adapter-vue';
import { Direction } from './index';

// grid表示布局，2 * 2布局就是 rows * clos
const props = defineProps<{
  grid?: { rows?: number; cols?: number };
  renderStreamList: any;
}>();

const direction = ref<Direction>(Direction.RIGHT);
const currentIndex = ref(0);
const startX = ref();
const startY = ref();

// 每屏显示数量
const perViewCount = computed(() => {
  const { rows = 1, cols = 1 } = props?.grid || {};
  return rows * cols;
});

const sliderArr = ref([]);
const pageCount = ref(0);
const pageArr = ref([]);
watch(() => props.renderStreamList, () => {
  pageCount.value = Math.ceil(props.renderStreamList.length / perViewCount.value);
  if (pageCount.value === 1) {
    currentIndex.value = 0;
  }
  let arr = [];
  for (let i = 0; i < pageCount.value; i++) {
    arr.push(i);
  }
  pageArr.value = arr;
  sliderArr.value = Object.keys(Array.from({ length: props.renderStreamList.length })).map(item => parseInt(item));
  console.log(props.renderStreamList, pageCount.value)
}, {
  immediate: true,
})
const showTurnPageControl = computed(() => pageCount.value > 1);

// 根据当前所在页数，每页显示元素数和swiperslider列表计算需要渲染的swpierlist
const showSliderList = computed(() => sliderArr.value.slice(currentIndex.value * perViewCount.value, currentIndex.value * perViewCount.value + perViewCount.value));
function handleTouchStart(event: any) {
  startX.value = event.changedTouches[0].pageX;
  startY.value = event.changedTouches[0].pageY;
}
function handleTurnPageRight() {
  currentIndex.value = currentIndex.value + 1;
}
function handleTurnPageLeft() {
  currentIndex.value = currentIndex.value - 1;
}
function handleTouchEnd(event: any) {
  const moveDirection = event.changedTouches[0].pageX - startX.value;
  if (Math.abs(moveDirection) < 5) return;
  if (moveDirection < 0) {
    if (currentIndex.value === pageCount.value - 1) return;
    direction.value = Direction.LEFT;
    handleTurnPageRight();
  }
  if (moveDirection > 0) {
    if (currentIndex.value === 0) return;
    direction.value = Direction.RIGHT;
    handleTurnPageLeft();
  }
}

provide('showSliderList', showSliderList);
provide('direction', direction);
</script>

<style lang="scss" scope>
.swipe {
  width: 100%;
  height: 100%;
  position: absolute;
  flex-wrap: wrap;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  .swiper-sliders-container {
    position: relative;
    width: 100%;
  }
  .swipe-dots-container {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    top: 400px;
    .swipe-dots {
      width: 8px;
      height: 8px;
      background: #000;
      opacity: 0.15;
      border-radius: 20px;
      margin: 5px;
    }
    .swipe-current-dots {
      width: 8px;
      height: 8px;
      background: #000;
      opacity: 1;
      border-radius: 20px;
      margin: 5px;
    }
  }
}
</style>