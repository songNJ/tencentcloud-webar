<template>
  <div>
    <!-- 移动端 -->
    <div v-if="isMobile && remoteUsersList.length !== 0" :class="bodyStyle">
      <InviteCallee :local-user-info="localUserInfo" :callerUserInfo="callerUserInfo" :remote-users-list="remoteUsersList"></InviteCallee>
    </div>

    <!-- 桌面端 -->
    <div v-if="!isMobile && remoteUsersList.length !== 0" :class="bodyStyle">
      <div class="singleInvite-message">
        <div class="singleInvite-nick">
          <div class="singleInvite-nick-span">{{ callerUserInfo.displayUserInfo }}</div>
        </div>
        <span class="singleInvite-tips">{{ callAlertMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '../../../../adapter-vue';
import { TUIGlobal, TUIStore, StoreName, NAME } from '../../../../TUICallService/index';
import InviteCallee from './mobile/InviteCallee.vue';
const isMobile = !TUIGlobal.isPC;
const bodyStyle = isMobile ? 'groupInvite-header-mobile' : 'groupInvite-header-desktop';
const callRole = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE));
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const isGroupCall = ref(TUIStore.getData(StoreName.CALL, NAME.IS_GROUP));
const remoteUsersList = ref(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const callDuration = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));
const callAlertMessage = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_TIPS));
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const callerUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.CALLER_USER_INFO));

const handleCallerUserInfoChange = (value) => {
  callerUserInfo.value = value;
};
const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};
const handleCallRoleChange = (value) => {
  callRole.value = value;
};
const handleIsGroupChange = (value) => {
  isGroupCall.value = value;
};
const handleCallMediaTypeChange = (value) => {
  callType.value = value;
};
const handleRemoteUserInfoListChange = (value) => {
  remoteUsersList.value = value;
};
const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleCallDurationChange = (value) => {
  callDuration.value = value;
};
const handleCallTipsChange = (value) => {
  callAlertMessage.value = value;
};

const watchOptions = {
  [NAME.CALLER_USER_INFO]: handleCallerUserInfoChange,
  [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  [NAME.CALL_ROLE]: handleCallRoleChange,
  [NAME.IS_GROUP]: handleIsGroupChange,
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  [NAME.REMOTE_USER_INFO_LIST]: handleRemoteUserInfoListChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.CALL_DURATION]: handleCallDurationChange,
  [NAME.CALL_TIPS]: handleCallTipsChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});
</script>

<style lang="scss" scoped>
.groupInvite-header-desktop {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);

  .singleInvite-message {
    text-align: center;
    .singleInvite-nick {
      font-style: normal;
      font-weight: 600;
      font-size: 40px;
      line-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;

      .singleInvite-nick-span {
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        line-height: normal;
        white-space: nowrap;
      }
    }

    .singleInvite-tips {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: white;
    }
  }
}
</style>
