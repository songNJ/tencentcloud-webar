<template>
  <div class="btn-container">
    <div :class="btnBodyClassName" @click="handleClick" :style="{ width: btnBodyStyle.width, height: btnBodyStyle.height }">
      <img v-if="loading" class="invite-calling-item-loading" :src="loadingIcon" />
      <img v-if="icon && !loading" :src="icon" />
      <slot />
    </div>
    <div :class="btnTextClassName">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '../../../../../adapter-vue';
import loadingVideo from '../../../../assets/common/loading-video.png';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
  },
  size: {
    type: Number,
  },
  loadingIcon: {
    type: String,
    default: loadingVideo,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isMobile: {
    type: Boolean,
    default: false,
  }
});

const btnBodyClassName = computed(() => `btn-body ${props.isMobile ? 'mobile' : 'desktop'}`);
const btnTextClassName = computed(() => `btn-text ${props.isMobile ? 'mobile' : 'desktop'}`);

const emit = defineEmits(['click']);

const handleClick = () => {
  !props.loading && emit('click');
};

const btnBodyStyle = computed(() => {
  const width = props.size
    ? props.size
    : props.isMobile ? 50 : 40;
  const height = props.size
    ? props.size
    : props.isMobile ? 50 : 40;
  return { width: `${width}px`, height: `${height}px` };
});

</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;

  .btn-body {
    cursor: pointer;
    &.mobile {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100%;
      height: 100%;
    }

    image {
      width: 100%;
      height: 100%;
    }

    .invite-calling-item-loading {
      width: 100%;
      height: 100%;
      animation: rotation 2s linear infinite;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .invite-calling-item-loading img {
      width: 100%;
      height: 100%;
    }
  }

  .btn-text {
    margin-top: 5px;
    white-space: nowrap;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;

    &.desktop {
      font-size: 14px;
    }
  }
}
</style>
