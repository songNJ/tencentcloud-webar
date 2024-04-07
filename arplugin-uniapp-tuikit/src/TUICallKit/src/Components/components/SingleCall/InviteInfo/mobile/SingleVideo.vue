<template>
  <div class="singleInvite-box">
    <div class="singleInvite-message">
      <div class="singleInvite-nick">{{ remoteUsersList[0].displayUserInfo }}</div>
      <span class="singleInvite-tips">{{ callAlertMessage }}</span>
    </div>
    <img class="singleInvite-avatar" :src="remoteUsersList[0].avatar || defaultAvatar" :onerror="handleErrorImage" />
  </div>
</template>

<script lang="ts" setup>
import defaultAvatar from '../../../../assets/mobile/default_avatar.png';
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
});

function handleErrorImage(e: any) {
  e.target.src = defaultAvatar;
}
</script>

<style lang="scss" scoped>
.singleInvite-box {
  display: flex;
  .singleInvite-message {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    justify-content: center;

    .singleInvite-nick {
      font-size: 20px;
      letter-spacing: 0;
      margin: 0 auto;
      font-weight: 600;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .singleInvite-tips {
      font-size: 14px;
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }
  }
  .singleInvite-avatar {
    width: 100px;
    height: 100px;
    border-radius: 12px;
  }
}
</style>
