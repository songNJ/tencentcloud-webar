<template>
  <TDialog
    :moduleValue="dialogVisible"
    :isH5="!isPC"
    :isHeaderShow="false"
    :isFooterShow="false"
    :background="false"
    @update:moduleValue="reset"
  >
    <TTransfer
      :isSearch="props.isNeedSearch"
      :title="props.title"
      :list="props.userList"
      :isH5="!isPC"
      :isRadio="props.isRadio"
      :total="props.total"
      @getMore="handleGetMore"
      @search="handleSearchUser"
      @submit="submit"
      @cancel="reset"
    />
  </TDialog>
</template>
<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from "../../../../adapter-vue";
import TDialog from "./components/Dialog/TDialog.vue";
import TTransfer from "./components/Transfer/TTransfer.vue";

const emits = defineEmits(["complete", "search", "getMore", "update:isShow"]);

const props = defineProps({
  isRadio: {
    type: Boolean,
    default: false,
  },
  isNeedSearch: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  userList: {
    type: Array,
    default: () => {
      return [];
    },
  },
  total: {
    type: Number,
    default: 0,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  isPC: {
    type: Boolean,
    default: true,
  },
});

const dialogVisible = ref<boolean>(false);

watchEffect(() => {
  dialogVisible.value = props.isShow;
});

const reset = () => {
  dialogVisible.value = !dialogVisible.value;
  emits("complete", []);
  emits("update:isShow", dialogVisible.value);
};

const submit = (dataList: any) => {
  emits("complete", dataList);
};

const handleSearchUser = (userID: string) => {
  emits("search", userID);
};

const handleGetMore = () => {
  emits("getMore");
};
</script>
