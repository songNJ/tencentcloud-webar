<template>
  <div :class="bodyStyle">
    <SelectUser
      :isShow="showSelectUser"
      :isNeedSearch="true"
      :userList="groupMemberList"
      :isPC="!isMobile"
      :total="memberCount"
      @getMore="getMoreMemberList"
      @complete="handleSelectedResult"
      @search="handleSearch"
      @update:isShow="handleCancel"
    />
    <div v-if="callStatus === CallStatus.CALLING && callRole !== CallRole.CALLER">
      <InviteInfo></InviteInfo>
    </div>
    <PusherPlayer v-if="callStatus === CallStatus.CONNECTED || callRole === CallRole.CALLER"></PusherPlayer>
    <BtnOperate></BtnOperate>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from '../../../adapter-vue';
import { TUICallKitServer, TUIGlobal, TUIStore, StoreName, NAME, CallStatus, CallRole } from '../../../TUICallService/index';
import InviteInfo from './InviteInfo/InviteInfo.vue';
import BtnOperate from './BtnOperate/BtnOperate.vue';
import PusherPlayer from './PusherPlayer/PusherPlayer.vue';
import SelectUser from "../common/SelectUser/SelectUser.vue";
const callRole = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const isMobile = !TUIGlobal.isPC;
const bodyStyle = isMobile ?'':'group-deskTop';
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const remoteUserInfoList = ref(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
const showSelectUser = ref(false);
const memberCount = ref(0);
const groupMemberList = ref([]);
const backupGroupMemberList = ref([]);
const offset = ref(0);
const count: number = 30;

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});
onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});
const handleCallStatusChange = (value: CallStatus) => {
  callStatus.value = value;
};
const handleCallMediaTypeChange = (value: any) => {
  callType.value = value;
};
const handleCallRoleChange = (value: CallRole) => {
  callRole.value = value;
};
const handleLocalUserInfoChange = (value: any) => {
  localUserInfo.value = value;
}
const handleRemoteUserInfoChange = (value: any) => {
  remoteUserInfoList.value = value;
}
const handleShowSelectUser = async (value: boolean) => {
  showSelectUser.value = value;
  if (showSelectUser.value) {
    await getGroupMemberList();
    const groupProfile = await TUICallKitServer.getGroupProfile();
    memberCount.value = groupProfile.memberCount;
  }
}
const watchOptions = {
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  [NAME.CALL_ROLE]: handleCallRoleChange,
  [NAME.SHOW_SELECT_USER]: handleShowSelectUser,
  [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  [NAME.REMOTE_USER_INFO_LIST]: handleRemoteUserInfoChange,
};
const handleCancel = () => {
  showSelectUser.value = false;
  TUIStore.update(StoreName.CALL, NAME.SHOW_SELECT_USER, false);
  offset.value = 0;
  groupMemberList.value = [];
}
const getMoreMemberList = async () => {
  offset.value += count;
  await getGroupMemberList();
}
const getGroupMemberList = async () => {
  const memberList = await TUICallKitServer.getGroupMemberList(count, offset.value);
  const inCallUserIdList = [...remoteUserInfoList.value, localUserInfo.value].map(obj => obj.userId);
  groupMemberList.value.push(...memberList);
  groupMemberList.value = groupMemberList.value.map(obj => {
    if (inCallUserIdList.includes(obj.userID)) {
      obj = { ...obj, isDisabled: true };
    }
    return obj;
  });
  backupGroupMemberList.value = groupMemberList.value;
}
const handleSelectedResult = async (selectedUserInfoList: Array<any>) => {
  try {
    if (selectedUserInfoList.length <= 0) {
      return ;
    }
    showSelectUser.value = false;
    TUIStore.update(StoreName.CALL, NAME.SHOW_SELECT_USER, false);
    offset.value = 0;
    const userIDList = selectedUserInfoList.map(obj => obj.userID);
    await TUICallKitServer.inviteUser({userIDList});
    groupMemberList.value = [];
  } catch (error) {
    console.debug(error);
  }
}
const handleSearch = (searchValue: string) => {
  if (searchValue) {
    groupMemberList.value = groupMemberList.value.filter(obj => {
      return obj.userID.includes(searchValue) || obj.nick.includes(searchValue)
    });
  } else {
    groupMemberList.value = backupGroupMemberList.value;
  }
}
</script>

<style scoped>
.group-deskTop{
  background: #00183c;
  z-index: 0;
}
</style>
