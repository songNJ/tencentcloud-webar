import { onMounted, onUnmounted, ref, watch } from '../../../../adapter-vue';
import { Direction } from '.';

export default function useSlide({ pageCount }) {
  const startX = ref();
  const startY = ref();
  const currentIndex = ref(0);
  const direction = ref<Direction>(Direction.RIGHT);

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

  watch(pageCount, () => {
    // 当总页数只有一页时，更新当前所在页索引为第一页
    if (pageCount.value === 1 && currentIndex.value !== 0) {
      currentIndex.value = 0;
    }
  });

  onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);
  });

  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart, false);
    document.removeEventListener('touchend', handleTouchEnd, false);
  });

  return {
    currentIndex,
    direction,
  };
}
