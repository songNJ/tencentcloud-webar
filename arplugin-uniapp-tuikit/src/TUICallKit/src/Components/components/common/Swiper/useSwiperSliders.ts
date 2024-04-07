import { onMounted, onUpdated, ref } from '../../../../adapter-vue';

function filterSwiplerSlider(els: HTMLCollection) {
  const rs: Element[] = [];
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    if (el.className.includes('swiper-item')) {
      rs.push(el);
    }
  }
  return rs;
}

export function useSwiperSliders(swiperContainerRef): any {
  const sliders = ref<Element[]>([]);
  const updateSliders = () => {
    const els = swiperContainerRef.value.children;
    const slotsList = filterSwiplerSlider(els);
    if (sliders.value.length !== slotsList.length) {
      sliders.value = slotsList;
    }
  };

  onMounted(() => {
    updateSliders();
  });

  onUpdated(() => {
    updateSliders();
  });

  // @ts-ignore
  return sliders;
}
