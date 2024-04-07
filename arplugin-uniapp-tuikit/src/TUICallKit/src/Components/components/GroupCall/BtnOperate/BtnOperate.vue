<template>
  <div>
    <!-- 移动端呼叫状态 -->
    <div v-if="callStatus === CallStatus.CALLING && isMobile" :class="[mobile, textColor]">
      <div class="btn-operate">
        <Reject v-if="!isSponsor" class="mobile-reject" :is-mobile="isMobile"></Reject>
        <Accept v-if="!isSponsor" class="mobile-accept" :is-mobile="isMobile" :call-type="callType"> </Accept>
        <InviteUser v-if="isSponsor" class="mobile-invite" :is-mobile="isMobile" ></InviteUser>
        <Hangup v-if="isSponsor" :isGroupCall="isGroupCall" :callType="callType" :is-mobile="isMobile" :isClickable="isClickable"></Hangup>
      </div>
    </div>

    <!-- 移动端通话状态 -->
    <div v-if="callStatus === CallStatus.CONNECTED && isMobile" :class="[mobile, textColor]">
      <div class="btn-operate">
        <Timer :call-duration="callDuration" :call-type="callType"></Timer>
      </div>
      <div v-if="callType === CallMediaType.VIDEO" class="btn-operate">
        <Microphone class="btn" :local-user-info="localUserInfo" :is-mobile="isMobile"></Microphone>
        <Speaker class="btn" v-if="!isH5"></Speaker>
        <CameraBox class="btn" :is-mobile="isMobile"></CameraBox>
      </div>
      <div class="btn-operate">
        <Microphone class="btn" v-if="callType === CallMediaType.AUDIO" :local-user-info="localUserInfo" :is-mobile="isMobile"></Microphone>
        <InviteUser class="btn" :is-mobile="isMobile" ></InviteUser>
        <Hangup class="btn" :is-mobile="isMobile" :isGroupCall="isGroupCall" :callType="callType" :isClickable="isClickable"></Hangup>
        <Speaker class="btn" v-if="callType === CallMediaType.AUDIO && !isH5"></Speaker>
      </div>
    </div>

    <!-- 桌面端呼叫状态 -->
    <div v-if="callStatus === CallStatus.CALLING && !isMobile" class="control-wrapper-desktop">
      <div class="panel-button-area">
        <Reject class="btn" v-if="!isSponsor" :is-mobile="isMobile"></Reject>
        <Accept class="btn" v-if="!isSponsor" :is-mobile="isMobile" :call-type="callType"></Accept>
        <CameraBox class="btn" v-if="callType === CallMediaType.VIDEO" :is-mobile="isMobile"></CameraBox>
        <Microphone class="btn" v-if="isSponsor" :local-user-info="localUserInfo" :is-mobile="isMobile"></Microphone>
        <InviteUser class="btn" v-if="isSponsor" :is-mobile="isMobile" ></InviteUser>
        <Hangup class="btn" v-if="isSponsor" :isGroupCall="isGroupCall" :callType="callType"  :is-mobile="isMobile" :isClickable="isClickable"></Hangup>
      </div>
    </div>

    <!-- 桌面端通话状态 -->
    <div v-if="callStatus === CallStatus.CONNECTED && !isMobile" class="control-wrapper-desktop">
      <div class="panel-button-area">
        <CameraBox class="btn" v-if="callType === CallMediaType.VIDEO" :is-mobile="isMobile"></CameraBox>
        <Microphone class="btn" :local-user-info="localUserInfo" :is-mobile="isMobile"></Microphone>
        <InviteUser class="btn" :is-mobile="isMobile" ></InviteUser>
        <Hangup class="btn" :is-mobile="isMobile" :isGroupCall="isGroupCall" :callType="callType" :isClickable="isClickable"></Hangup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from '../../../../adapter-vue';
import Hangup from '../../common/Button/Hangup.vue';
import Accept from '../../common/Button/Accept.vue';
import Reject from '../../common/Button/Reject.vue';
import Microphone from '../../common/Button/Microphone.vue';
import Speaker from '../../common/Button/Speaker.vue';
import CameraBox from '../../common/Button/Camera.vue';
import InviteUser from '../../common/Button/InviteUser.vue';
import Timer from '../../common/Button/Timer.vue';
import { TUIGlobal, TUIStore, StoreName, NAME, CallMediaType, CallStatus, CallRole } from '../../../../TUICallService/index';
const callRole = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_ROLE));
const callType = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_MEDIA_TYPE));
const callStatus = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_STATUS));
const isGroupCall = ref(TUIStore.getData(StoreName.CALL, NAME.IS_GROUP));
const callDuration = ref(TUIStore.getData(StoreName.CALL, NAME.CALL_DURATION));
const isClickable = ref(TUIStore.getData(StoreName.CALL, NAME.IS_CLICKABLE));
const isMobile = !TUIGlobal.isPC;
const isH5 = TUIGlobal.isH5;
let isSponsor = callRole.value === CallRole.CALLER;
const mobile = 'control-wrapper-mobile';
const textColor = 'black';
const localUserInfo = ref(TUIStore.getData(StoreName.CALL, NAME.LOCAL_USER_INFO));

const handleLocalUserInfoChange = (value) => {
  localUserInfo.value = value;
};
const handleCallRoleChange = (value) => {
  isSponsor = value === CallRole.CALLER;
  callRole.value = value;
};
const handleIsGroupChange = (value) => {
  isGroupCall.value = value;
};
const handleCallMediaTypeChange = (value) => {
  callType.value = value;
};
const handleCallStatusChange = (value) => {
  callStatus.value = value;
};
const handleCallDurationChange = (value) => {
  callDuration.value = value;
};
const handleIsClickableChange = (value) => {
  isClickable.value = value;
};

const watchOptions = {
  [NAME.LOCAL_USER_INFO]: handleLocalUserInfoChange,
  [NAME.CALL_ROLE]: handleCallRoleChange,
  [NAME.IS_GROUP]: handleIsGroupChange,
  [NAME.CALL_MEDIA_TYPE]: handleCallMediaTypeChange,
  [NAME.CALL_STATUS]: handleCallStatusChange,
  [NAME.CALL_DURATION]: handleCallDurationChange,
  [NAME.IS_CLICKABLE]: handleIsClickableChange,
};

onMounted(() => {
  TUIStore.watch(StoreName.CALL, watchOptions, { notifyRangeWhenWatch: NAME.MYSELF });
});

onUnmounted(() => {
  TUIStore.unwatch(StoreName.CALL, watchOptions);
});
</script>

<style lang="scss" src="./style/index.scss" scoped></style>
