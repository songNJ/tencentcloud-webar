<template> 
  <IconBtn
    :icon="inviteUserSrc"
    :text="t('invite member')"
    :isMobile="isMobile"
    @click="inviteUserEvent"
  />
</template>
  
<script lang="ts" setup>
import { TUIStore, StoreName, NAME, t } from '../../../../TUICallService/index';
import inviteUserPC from '../../../assets/desktop/invite_user.svg';
import inviteUserWX from '../../../assets/mobile/invite_user.svg';
import IconBtn from './Btn/IconBtn.vue';

const props = defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  }
});
const inviteUserSrc = props.isMobile ? inviteUserWX : inviteUserPC;
const inviteUserEvent = async () => {
  TUIStore.update(StoreName.CALL, NAME.SHOW_SELECT_USER, true);
};
</script>