<template>
  <div>
    <img class="avatar" :src="callerUserInfo.avatar || defaultAvatar" :onerror="handleErrorImage" />
    <div class="nick">{{ callerUserInfo.displayUserInfo }}</div>
    <div class="tips">{{ t('Invited group call') }}</div>
    <div class="list-tips">{{ t('Those involved') }}</div>
    <div class="list">
      <div v-for="(item, index) in renderStreamList" :key="index" class="list-item">
        <img class="list-avatar" :src="item.avatar || defaultAvatar" :onerror="handleErrorImage" />
        <div class="list-name">{{ item.displayUserInfo }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '../../../../../adapter-vue';
import defaultAvatar from '../../../../assets/mobile/default_avatar.png';
import { t } from '../../../../../TUICallService/index';
const props = defineProps({
  remoteUsersList: {
    type: Array,
    required: true,
  },
  localUserInfo: {
    type: Object,
    required: true,
  },
  callerUserInfo:{
    type: Object,
    required: true,
  }
});
function handleErrorImage(e: any) {
  e.target.src = defaultAvatar;
}

const renderStreamList = computed(() => {
  return [props.localUserInfo, ...props.remoteUsersList];
});
</script>

<style lang="scss" scoped>
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  display: block;
  margin: 40px auto 15px;
}

.tips {
  width: 126px;
  height: auto;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  margin: 16px auto 40px auto;
  text-align: center;
}

.nick {
  font-size: 20px;
  letter-spacing: 0;
  margin: 0 auto;
  font-weight: 600;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.list-tips {
  width: 112px;
  height: auto;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  margin: 0 auto 24px auto;
  text-align: center;
}

.list {
  position: absolute;
  left: 14vw;
  margin-top: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 272px;
  justify-content: center;
  flex-wrap: wrap;
}

.list-item {
  flex: 0.25;
  text-align: center;
  width: 64px;
  margin: 2px;

  .list-avatar {
    border-radius: 10%;
    width: 64px;
    height: 64px;
  }

  .list-name {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    line-height: 18px;
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: normal;
    white-space: nowrap;
  }
}
</style>
