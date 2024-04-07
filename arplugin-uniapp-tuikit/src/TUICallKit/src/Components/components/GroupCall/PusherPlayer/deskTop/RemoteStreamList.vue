<template>
  <div class="calling-wrapper">
    <div :class="groupCallingContainerClass">
      <div id="localVideo" :class="groupUserViewClass">
        <div v-if="callStatus !== 'connected' || callType === CallMediaType.AUDIO" class="user-view-text-container">
            <div :class="userViewUserId" class="localStream-userInfo">{{ localUserInfo.displayUserInfo }}</div>
        </div>
        <span class="tag">
          <div class="microphone-icon-container">
            <MicVolume v-if="localUserInfo.isAudioAvailable" :volume="localUserInfo.volume"></MicVolume>
            <MicVolumeClosed v-else />
          </div>
          <div class="stream-userInfo"> {{ localUserInfo.displayUserInfo }}{{ t('me') }} </div>
        </span>
      </div>
      <div v-for="remoteUserItem in remoteList" :id="remoteUserItem.domId" :key="remoteUserItem.userId" :class="groupUserViewClass">
        <div>
          <div v-if="!remoteUserItem.isEnter" class="invite-calling-item-loading">
            <img :src="loading" />
          </div>
          <div v-if="callStatus !== 'connected' || callType === CallMediaType.AUDIO" class="user-view-text-container">
            <div class="invite-userInfo" :class="userViewUserId">{{ remoteUserItem.displayUserInfo }}</div>
          </div>
        </div>
        <span class="tag">
          <div class="microphone-icon-container">
            <MicVolume v-if="remoteUserItem.isAudioAvailable" :volume="remoteUserItem.volume"></MicVolume>
            <MicVolumeClosed v-else />
          </div>
          <div class="stream-userInfo">{{ remoteUserItem.displayUserInfo }}</div> 
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from '../../../../../adapter-vue';
import MicVolume from '../../../common/MicVolume/MicVolume.vue';
import loading from '../../../../assets/mobile/loading.png';
import MicVolumeClosed from '../../../common/MicVolume/MicVolumeClosed.vue';
import { t, CallMediaType } from '../../../../../TUICallService/index';
const props = defineProps({
  remoteList: {
    type: Array,
    required: true,
  },
  callStatus: {
    type: String,
    required: true,
  },
  callType: {
    type: Number,
    required: true,
  },
  localUserInfo: {
    type: Object,
    required: true,
  },
});
const currentPage = ref<number>(1);
const currentPageRemoteList = ref([]);
const groupUserViewClass = ref<string>('group-user-view');
const groupCallingContainerClass = ref<string>('group-calling-container');
const userViewUserId = ref<string>('user-view-user-id');

watch(
  currentPageRemoteList,
  async () => {
    const userViewCount = currentPageRemoteList.value.length + 1;
    groupUserViewClass.value = `group-user-view group-user-view-${userViewCount}`;
    groupCallingContainerClass.value = `group-calling-container group-calling-container-${userViewCount}`;
    userViewUserId.value = `user-view-user-id user-view-user-id-${userViewCount}`;
  },
  { flush: 'post', deep: true },
);

watchEffect(async () => {
  await refreshCurrentPageRemoteList();
});

async function refreshCurrentPageRemoteList() {
  const newPageList: RemoteUser[] = [];
  for (let i = (currentPage.value - 1) * 8; i < currentPage.value * 8 && i < props.remoteList.length; i++) {
    newPageList.push(props.remoteList[i]);
  }
  currentPageRemoteList.value = newPageList;
}
</script>

<style lang="scss">
.group-user-view {
  > span+div{
    background-color: #4c515a !important;
  }
}
</style>

<style lang='scss' scoped>
.calling-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: rgba(0, 24, 60, 0.7);
  backdrop-filter: blur(34px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  z-index: -1;
}

.calling-wrapper:hover {
  z-index: inherit;
  transition: all 0.5s ease-in-out;
}

#local-dialing,
#localVideo {
  background-color: #4c515a;
  background-repeat: no-repeat;
  background-size: auto;
  background-position-x: center; /* 水平居中 */
  background-position-y: calc(50% + 10px);
}

.localStream-userInfo{
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
  white-space: nowrap;
}

.panel-button-area {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px 0;
}

.panel-dialing-info {
  text-align: center;
}

.control-wrapper:hover {
  z-index: 13;
}

.control-item {
  display: flex;
  flex-direction: column;
  width: 100px;
  margin: 0 20px;
}

.invite-calling-item-loading {
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 40px);
  width: 40px;
  height: 40px;
  animation: rotation 2s linear infinite;
}

.invite-userInfo {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
  white-space: nowrap;
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

.tag {
  color: white;
  z-index: inherit;
  background: rgba(0, 0, 0, 0.6);
  padding: 2px 10px;
  border-top-right-radius: inherit;
  border-bottom-left-radius: inherit;
  font-size: 14px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 11;
  display: flex;
  align-items: center;

  .microphone-icon-container {
    margin-left: 0;
    margin-right: 2px;
    width: 20px;
    background-color: transparent;
  }

  .stream-userInfo {
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: normal;
    white-space: nowrap;
  }
}

.switch-large-small {
  position: absolute;
  right: 12px;
  top: 12px;
  width: 16px;
  height: 16px;
  z-index: inherit;
  cursor: pointer;
}

.small-h5 {
  position: absolute;
  width: 94px;
  height: 160px;
  min-height: 100px;
  max-height: 60%;
  top: 30px;
  right: 10px;
  z-index: 2;
  overflow: hidden;
  background: #000;
  border-radius: 4px;
}

.small {
  position: absolute;
  width: 260px;
  height: 170px;
  min-height: 100px;
  max-height: 60%;
  top: 30px;
  left: 30px;
  z-index: 2;
  overflow: hidden;
  resize: both;
  background: #000;
  border-radius: 4px;
}

.large {
  min-height: 100px;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: inherit;
  overflow: hidden;
}

.large .switch-large-small {
  display: none;
}

.group-calling-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.group-user-view {
  width: 33.333%;
  height: 33.333%;
  position: relative;
  background-color: #4c515a;
  backdrop-filter: blur(34px);
  color: white;
  overflow: hidden;
}
.user-view-text-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 11;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(0, -20px);
}

.user-view-user-id {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
}

.user-view-info {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
}

.page-turn {
  width: 40px;
  height: 86px;
  border-radius: 4.21px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}

.turn-icon-container {
  width: 14px;
  height: 23px;
}

.right {
  right: 0;
}

.microphone-icon-container {
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
}

.group-user-view-1 {
  width: 100%;
  height: 100%;
}

.group-calling-container-1 {
  height: 100%;
}

.group-user-view-2 {
  width: 50%;
  height: 100%;
}

.group-calling-container-2 {
  height: 50%;
}

.group-user-view-3 {
  width: 50%;
  height: 50%;
}

.group-user-view-4 {
  width: 50%;
  height: 50%;
}

.group-calling-container-3 {
  height: 100%;
}

.group-calling-container-4 {
  height: 100%;
}

.group-user-view-5 {
  width: 33.333%;
  height: 50%;
}

.group-user-view-6 {
  width: 33.333%;
  height: 50%;
}

.group-calling-container-5 {
  height: 66%;
}

.group-calling-container-6 {
  height: 66%;
}

.user-view-user-id-1 {
  font-size: 24px;
}

.user-view-user-id-2 {
  font-size: 22px;
}

.user-view-user-id-3 {
  font-size: 22px;
}

.user-view-user-id-4 {
  font-size: 22px;
}

.user-view-user-id-5 {
  font-size: 18px;
}

.user-view-user-id-6 {
  font-size: 18px;
}

.user-view-user-id-7 {
  font-size: 18px;
}

.user-view-user-id-8 {
  font-size: 18px;
}

.user-view-user-id-9 {
  font-size: 18px;
}

.float-control-panel {
  width: 168px;
  height: 56px;
  background: white;
  z-index: 13;

  position: fixed;
  top: 20px;
  right: 20px;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  border-radius: 40px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.function-buttons {
  position: absolute;
  right: 12px;
  top: 12px;
  z-index: 13;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.minimize {
  margin-left: 10px;
}

.float-control-item-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 56px;
  height: 56px;
  position: relative;
}

.float-control-item-icon-container {
  border-radius: 40px;
  width: 40px;
  height: 40px;

  margin: 0.5rem;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.float-control-item-icon-container:hover {
  background: rgba(218, 218, 218, 0.3);
}
</style>
