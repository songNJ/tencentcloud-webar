<template>
  <div class="transfer" :class="[props.isH5 ? 'transfer-h5' : '']">
    <header
      class="transfer-header transfer-h5-header"
      v-if="props.isH5"
      @click="cancel"
    >
      <TIcon
        class="icon"
        :file="backIcon"
        :width="'18px'"
        :height="'18px'"
      ></TIcon>
      <span class="title">{{ transferTitle }}</span>
      <span class="space"></span>
    </header>
    <main class="main">
      <div class="left">
        <header class="transfer-header">
          <!-- PC 端触发 @keyup.enter -->
          <input
            v-if="!props.isH5 && isTransferSearch"
            type="text"
            :value="searchValue"
            @keyup.enter="handleInput"
            :placeholder="t('Please enter userID')"
            enterkeyhint="search"
            :class="[props.isH5 ? 'left-uniapp-input' : '']"
          />
          <!-- 非 PC 端触发 blur -->
          <input
            v-if="props.isH5 && isTransferSearch"
            type="text"
            @blur="handleInput"
            @confirm="handleInput"
            :placeholder="t('Please enter userID')"
            enterkeyhint="search"
            :value="searchValue"
            :class="[props.isH5 ? 'left-uniapp-input' : '']"
          />
        </header>
        <main class="transfer-left-main">
          <ul class="transfer-list">
            <li
              class="transfer-list-item"
              @click="selectedAll"
              v-if="optional.length > 1 && !isRadio"
            >
              <TIcon
                v-if="transferSelectedList.length === optional.length"
                :file="selectedIcon"
                :width="'18px'"
                :height="'18px'"
              ></TIcon>
              <i v-else class="icon-unselected"></i>
              <span class="select-all">{{ t('Select all') }}</span>
            </li>
            <li
              class="transfer-list-item"
              v-for="item in transferList"
              :key="item.userID"
              @click="selected(item)"
            >
              <TIcon
                v-if="transferSelectedList.indexOf(item) > -1"
                :file="selectedIcon"
                :class="[item.isDisabled && 'disabled']"
                :width="'18px'"
                :height="'18px'"
              ></TIcon>
              <i
                v-else
                :class="[item.isDisabled && 'disabled', 'icon-unselected']"
              ></i>
              <template v-if="!isTransferCustomItem">
                <img
                  class="avatar"
                  :src="
                    item.avatar ||
                    'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
                  "
                  onerror="this.src='https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'"
                />
                <span class="name">{{ item.nick || item.userID }}</span>
                <span v-if="item.isDisabled"></span>
              </template>
              <template v-else>
                <slot name="left" :data="item" />
              </template>
            </li>
            <li
              class="transfer-list-item more"
              @click="getMore"
              v-if="transferTotal > transferList.length"
            >
              {{ t('View more') }}
            </li>
          </ul>
        </main>
      </div>
      <div class="right">
        <header class="transfer-header" v-if="!props.isH5">
          {{ transferTitle }}
        </header>
        <ul class="transfer-list" v-if="resultShow">
          <p
            class="transfer-text"
            v-if="transferSelectedList.length > 0 && !props.isH5"
          >
            {{ transferSelectedList.length }} {{ t('people selected') }}
          </p>
          <li
            class="transfer-list-item space-between"
            v-for="(item, index) in transferSelectedList"
            :key="index"
          >
            <aside class="transfer-list-item-content">
              <template v-if="!isTransferCustomItem">
                <img
                  class="avatar"
                  :src="
                    item.avatar ||
                    'https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'
                  "
                  onerror="this.src='https://web.sdk.qcloud.com/component/TUIKit/assets/avatar_21.png'"
                />
                <span v-if="!props.isH5" class="name">{{
                  item.nick || item.userID
                }}</span>
              </template>
              <template v-else>
                <slot name="right" :data="item" />
              </template>
            </aside>
            <span @click="selected(item)" v-if="!props.isH5">
              <TIcon
                :file="cancelIcon"
                :width="'18px'"
                :height="'18px'"
              ></TIcon>
            </span>
          </li>
        </ul>
        <footer class="transfer-right-footer">
          <button class="btn btn-cancel" @click="cancel">{{ t('Cancel') }}</button>
          <button
            v-if="transferSelectedList.length > 0"
            class="btn"
            @click="submit"
          >
            {{ t('Done') }}
          </button>
          <button v-else class="btn btn-no" @click="submit">{{ t('Done') }}</button>
        </footer>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, computed, defineProps, defineEmits } from "../../../../../../adapter-vue";
import { t } from '../../../../../../TUICallService/index';
import TIcon from "../Icon/TIcon.vue";
import selectedIcon from "./icon/selected.svg";
import backIcon from "./icon/back.svg";
import cancelIcon from "./icon/cancel.svg";

interface ITransferListItem {
  isDisabled?: boolean;
  avatar?: string;
  nick?: string;
  userID?: string;
  [propName: string]: any;
}

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  selectedList: {
    type: Array,
    default: () => [],
  },
  isSearch: {
    type: Boolean,
    default: true,
  },
  isRadio: {
    type: Boolean,
    default: false,
  },
  isCustomItem: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  resultShow: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  isH5: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["search", "submit", "cancel", "getMore"]);

const type = ref("");
const transferList = ref<Array<ITransferListItem>>([]);
const transferTotal = ref<number>(0);
const transferSelectedList = ref<Array<ITransferListItem> | any[]>([]);
const isTransferSearch = ref(true);
const isTransferCustomItem = ref(false);
const transferTitle = ref("");
const searchValue = ref("");

watchEffect(() => {
  const { list, isCustomItem, isSearch, title, total, selectedList } = props;
  if (isCustomItem) {
    for (let index = 0; index < list.length; index++) {
      if ((list[index] as any).conversationID.indexOf("@TIM#SYSTEM") > -1) {
        list.splice(index, 1);
      }
      transferList.value = list as Array<ITransferListItem>;
    }
  } else {
    transferList.value = list as Array<ITransferListItem>;
  }
  transferTotal.value = total ? total : list.length;
  transferSelectedList.value =
    selectedList && selectedList.length > 0
      ? selectedList
      : transferSelectedList.value;
  isTransferSearch.value = isSearch;
  isTransferCustomItem.value = isCustomItem;
  transferTitle.value = title;
  type.value = props.type;
});

// 可选项
const optional = computed(() =>
  transferList.value.filter((item: any) => !item.isDisabled)
);

const handleInput = (e: any) => {
  searchValue.value = e.target.value;
  emit("search", e.target.value);
};
const selected = (item: any) => {
  if (item.isDisabled) {
    return;
  }
  let list: Array<ITransferListItem> = transferSelectedList.value;
  const index: number = list.indexOf(item);
  if (index > -1) {
    return transferSelectedList.value.splice(index, 1);
  }
  if (props.isRadio) {
    list = [];
  }
  list.push(item);
  transferSelectedList.value = list;
};

const selectedAll = () => {
  if (transferSelectedList.value.length === optional.value.length) {
    transferSelectedList.value = [];
  } else {
    transferSelectedList.value = [...optional.value];
  }
};

const submit = () => {
  emit("submit", transferSelectedList.value);
  // 针对小程序做的数据清空
  searchValue.value = "";
  transferSelectedList.value = [];
};

const cancel = () => {
  emit("cancel");
  // 针对小程序做的数据清空
  searchValue.value = "";
  transferSelectedList.value = [];
};

const getMore = () => {
  emit("getMore");
};
</script>

<style scoped src="./style/transfer.css"></style>
