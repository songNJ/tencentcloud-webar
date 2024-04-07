<template>
  <div class="singleInvite-message">
    <img class="singleInvite-avatar" :src="remoteUsersList[0].avatar || defaultAvatar" :onerror="handleErrorImage" />
    <div class="singleInvite-nick">{{ remoteUsersList[0].displayUserInfo }}</div>
    <span v-if="callStatus === CallStatus.CALLING" class="singleInvite-tips">{{ callAlertMessage }}</span>
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '../../../../assets/mobile/default_avatar.png';
import { CallStatus } from '../../../../../TUICallService/index';
const props = defineProps({
  isSponsor: {
    type: Boolean,
    required: true,
  },
  remoteUsersList: {
    type: Array,
    required: true,
  },
  callAlertMessage: {
    type: String,
    required: true,
  },
  callStatus: {
    type: String,
    required: true,
  },
});

function handleErrorImage(e: any) {
  e.target.src = defaultAvatar;
}
</script>

<style lang="scss" scoped>
.singleInvite-message {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  justify-content: center;
  align-items: center;

  .singleInvite-nick {
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: #333333;
    letter-spacing: 0;
    font-weight: 500;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singleInvite-tips {
    height: 20px;
    font-size: 14px;
    color: #97989c;
    letter-spacing: 0;
    font-weight: 400;
    text-align: center;
  }
}

.singleInvite-avatar {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin-bottom: 12px;
  margin: 0 auto;
}
</style>
