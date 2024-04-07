<template>
  <div class="streamBox">
    <RemoteStreamMobile v-if="remoteList.length !== 0 && isMobile && !isWeChat" :local-user-info="localUserInfo" :remote-list="remoteList" :call-status="callStatus"></RemoteStreamMobile>
    <RemoteStreamDesk
      v-if="remoteList.length !== 0 && !isMobile && !isWeChat"
      :local-user-info="localUserInfo"
      :remote-list="remoteList"
      :call-status="callStatus"
      :call-type="callType"
    ></RemoteStreamDesk>
    <RemoteStreamWx
      v-if="isMobile && isWeChat"
      :local-user-info="localUserInfo"
      :remote-list="remoteList"
      :call-status="callStatus"
      :call-type="callType"
    ></RemoteStreamWx>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from '../../../../adapter-vue';
import RemoteStreamMobile from './mobile/RemoteStreamList.vue';
import RemoteStreamDesk from './deskTop/RemoteStreamList.vue';
import RemoteStreamWx from './wechat/RemoteStreamList.vue';
import { TUIGlobal, TUIStore, StoreName, NAME } from '../../../../TUICallService/index';
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const remoteList = ref(TUIStore.getData(StoreName.CALL, NAME.REMOTE_USER_INFO_LIST));
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const isMobile = !TUIGlobal.isPC;
const isWeChat = TUIGlobal.isWeChat;

const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};
const handleRemoteUserInfoListChange = (value) => {
  remoteList.value = value;
};
const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleCallMediaTypeChange = (value) => {
  callType.value = value;
};
const watchOptions = {
  [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  [NAME.REMOTE_USER_INFO_LIST]: handleRemoteUserInfoListChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});
</script>

<style scoped>
.streamBox {
  width: 100%;
  height: 100%;
}
</style>
