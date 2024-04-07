<template>
  <div class="invite-calling-list">
    <Swiper :grid="{ rows: 2, cols: 2 }">
      <SwiperSlider v-for="(item, index) in renderStreamList" :key="`${item.userId}`" :index="index" class="invite-calling-item">
        <div :id="item.domId" class="invite-calling-item-message">
          <div v-if="!item.isEnter && item.domId !== 'localVideo'" class="invite-calling-item-loading">
            <img :src="loading" />
          </div>
          <span v-if="item.isEnter && callStatus === 'connected' || item.domId === 'localVideo'" class="tag">
            <div class="microphone-icon-container">
              <MicVolume v-if="item.isAudioAvailable" :volume="item.volume"></MicVolume>
              <MicVolumeClosed v-else />
            </div>
            <div class="stream-userInfo"> {{ item.domId === 'localVideo' ? t('me') : item.displayUserInfo }} </div> 
          </span>
        </div>
        <img class="avatar" :src="item.avatar || defaultAvatar" :onerror="handleErrorImage" />
        <div v-if="!item.isEnter && item.domId !== 'localVideo'" class="invite-calling-item-id">{{ item.nick || item.userId }}</div>
      </SwiperSlider>
    </Swiper>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '../../../../../adapter-vue';
import Swiper from '../../../common/Swiper/Swiper.vue';
import SwiperSlider from '../../../common/Swiper/SwiperSlider.vue';
import loading from '../../../../assets/mobile/loading.png';
import defaultAvatar from '../../../../assets/mobile/default_avatar.png';
import MicVolume from '../../../common/MicVolume/MicVolume.vue';
import MicVolumeClosed from '../../../common/MicVolume/MicVolumeClosed.vue';
import { t } from '../../../../../TUICallService/index';
const props = defineProps({
  remoteList: {
    type: Array,
    required: true,
  },
  callStatus: {
    type: String,
    required: true,
  },
  localUserInfo: {
    type: Object,
    required: true,
  },
});

const renderStreamList = computed(() => {
  return [props.localUserInfo, ...props.remoteList];
});

function handleErrorImage(e: any) {
  e.target.src = defaultAvatar;
}
</script>

<style lang="scss" scoped>
#localVideo {
  width: 100%;
  height: 100%;
}

.invite-calling-list {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
}

.invite-calling-item {
  height: 187px;
  background-color: #000;
}

.invite-calling-item image {
  width: 100%;
  height: 100%;
}

.invite-calling-item-message {
  position: absolute;
  top: 0;
  left: 0;
  float: left;
  width: 100%;
  height: 100%;
  z-index: 2;

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
      margin-top: 4px;
      margin-right: 2px;
      width: 16px;
      background-color: transparent;
    }

    .stream-userInfo{
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: normal;
      white-space: nowrap;
    }
  }
}

.invite-calling-item-loading {
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  animation: rotation 2s linear infinite;
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

.invite-calling-item-id {
  position: absolute;
  left: 2%;
  bottom: 2%;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: normal;
  white-space: nowrap;
}

.avatar {
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>
