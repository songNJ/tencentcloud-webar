<template>
  <div class="swipe">
    <div ref="swiperContainerRef" class="swiper-sliders-container">
      <slot />
    </div>

    <!--左右滑动控制栏 -->
    <div v-if="showTurnPageControl" class="swipe-dots-container">
      <span v-for="item in pageCount" :key="item" class="swipe-dots" :class="[currentIndex === item - 1 ? 'swipe-current-dots' : '']"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from '../../../../adapter-vue';
import useSlide from './useSlide';
import { useSwiperSliders } from './useSwiperSliders';

const swiperContainerRef = ref();
const sliders = useSwiperSliders(swiperContainerRef);

// grid表示布局，2 * 2布局就是 rows * clos
const props = defineProps<{
  grid?: { rows?: number; cols?: number };
}>();
const perViewCount = computed(() => {
  const { rows = 1, cols = 1 } = props?.grid || {};
  return rows * cols;
});
const pageCount = computed(() => Math.ceil(sliders.value.length / perViewCount.value));
const showTurnPageControl = computed(() => pageCount.value > 1);
const { direction, currentIndex } = useSlide({ pageCount });

function calcSwiperSliderPosition({
  count,
  width,
  height,
  rows,
  cols,
  currentIndex,
}) {
  const positionArr: { top: string, left: string, width: number, height: number, visible: boolean }[] = [];
  const calcPageNumber = (index: number) => Math.floor(index / (rows * cols));
  
  for (let i = 0; i < count; i++) {
    positionArr[i] = {
      width,
      height,
      top: `${height * Math.floor((i - (calcPageNumber(i) * perViewCount.value)) / cols)}px`,
      left: `${width * (Math.floor(i % cols) + ((calcPageNumber(i) - currentIndex) * rows))}px`,
      visible: currentIndex === calcPageNumber(i),
    }
  }  

  return positionArr;
}

function getDirectionPropertyValue(node, label) {
  return parseFloat(node.getPropertyValue(label) || 0);
}

function updateSliderItemStyle(positionArr) {
  sliders.value.forEach((item, index) => {
    const { width, height, top, left, visible } = positionArr[index];
    item.style.top = top;
    item.style.left = left;
    item.style.width = width+'px';
    item.style.height = height+'px';
    item.style.visible = visible;
  });
}

watch([sliders, currentIndex], () => {
  const swipoerContainerWidth = swiperContainerRef.value.clientWidth;
  const { rows = 1, cols = 1 } = props?.grid || {};
  const sliderItemWidth = (parseInt(swipoerContainerWidth) / cols);
  const sliderItemStyle = getComputedStyle(sliders.value?.[0]);
  const sliderItemHeight = getDirectionPropertyValue(sliderItemStyle, 'height');

  // 因为swiplerSlider是absolute，所以父容器要计算高度，并更新
  swiperContainerRef.value.style.height = `${rows * sliderItemHeight}px`;

  // 计算每个swiplerSlider的宽高，绝对位置，保证rows * cols布局
  const positionArr = calcSwiperSliderPosition({
    count: sliders.value.length,
    width: sliderItemWidth,
    height: sliderItemHeight,
    rows,
    cols,
    currentIndex: currentIndex.value,
  });
  updateSliderItemStyle(positionArr);
});

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
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    overflow-x: hidden;
    &.swiper-sliders-container-column {
      flex-direction: column;
    }
    &.swiper-sliders-container-row {
      flex-direction: row;
    }
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