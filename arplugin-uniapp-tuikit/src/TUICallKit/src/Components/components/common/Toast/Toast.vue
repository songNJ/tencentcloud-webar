<template>
  <Transition name="slide-up" @after-leave="handleAfterLeave">
    <div v-show="isShow" :key="index" :class="toastClass">
      <div class="toast-content">{{ message }}</div>
      <i v-show="showClose" @click="handleClose" class="toast-close-icon"></i>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from '../../../../adapter-vue';
import { ToastType } from './type';

const props = defineProps<{
  type: ToastType,
  duration?: number,
  message: string,
  index: string,
  showClose?: boolean,
  destroy: () => void,
  close: () => void,
}>();

const isShow = ref(false);
const timer = ref<number | null>(null);
const toastClass = computed(() => `toast-container ${props.type}`);

const handleAfterLeave = () => {
  props.destroy();
};

const handleClose = () => {
  props.close();
  isShow.value = false;
};

const startTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value);
  }

  if (props.duration) {
    timer.value = setTimeout(() => {
      handleClose();
    }, props.duration);
  }
};

onMounted(() => {
  isShow.value = true;
  startTimer();
});

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value);
  }
});
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 1002;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 15px 15px 20px;
  background-color: #000;
  color: #FFF;
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  .toast-content {
    margin-right: 16px;
  }
  .toast-close-icon {
    width: 16px;
    line-height: 16px;
    cursor: pointer;
  }
  .toast-close-icon::before {
    font-style: normal;
    content: url('../../../assets/common/close.svg');
  }
}

.info {
  border-color: #EBEEF5;
  color: #909399;
  background-color: #edf2fc;
}

.success {
  color: #67C23A;
  background-color: #f0f9eb;
  border-color: #e1f3d8;
}
.waring {
  color: #E6A23C;
  background-color: #fdf6ec;
  border-color: #faecd8;
}
.error {
  color: #F56C6C;
  background-color: #fef0f0;
  border-color: #fde2e2;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>