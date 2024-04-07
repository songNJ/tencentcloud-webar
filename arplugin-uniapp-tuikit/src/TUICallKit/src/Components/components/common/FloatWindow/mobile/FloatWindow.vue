<template>
  <div class="phone-box" @click="toggleMinimize">
    <img class="phone-img" :src="phoneSrc" />
    <div class="phone-text">{{callStatus !== CallStatus.CONNECTED ? t('waiting') :callDuration}}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '../../../../../adapter-vue';
import phoneSrc from '../../../../assets/mobile/phone.svg';
import { TUICallKitServer, CallMediaType, CallStatus, TUIStore, StoreName, NAME, t } from '../../../../../TUICallService/index';
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const callDuration = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));

function toggleMinimize() {
  TUICallKitServer.toggleMinimize();
}

onMounted(() => {
  TUIStore.watch(
    StoreName.CALL,
    {
      [NAME.CALL_STATUS]: handleCallStatusChange,
      [NAME.CALL_DURATION]: handleCallDurationChange,
    },
    {
      notifyRangeWhenWatch: NAME.MYSELF,
    },
  );
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, {
    [NAME.CALL_STATUS]: handleCallStatusChange,
    [NAME.CALL_DURATION]: handleCallDurationChange,
  });
});

const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleCallDurationChange = (value) => {
  callDuration.value = value;
};
</script>

<style lang="scss" scoped>
.phone-box {
  width: 72px;
  height: 72px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  .phone-img {
    height: 36px;
    height: 36px;
    margin-bottom: 4px;
  }
  .phone-text {
    font-size: 12px;
    color: #1c66e5;
    font-family: PingFang SC;
    font-weight: 500px;
    line-height: 16px;
  }
}
</style>