<template>
  <!--本地 icon 资源, uniapp 打包到 app 仅支持标签 image, 打包小程序和 H5 均可支持标签 img -->
  <div class="icon" @click="handlerImgClick">
    <image
      class="icon"
      :src="props.file"
      v-if="props.isApp"
      :style="{ width: props.width, height: props.height }"
    />
    <img
      class="icon"
      :src="props.file"
      v-else
      :style="{ width: props.width, height: props.height }"
    />
  </div>
</template>
<script setup lang="ts">
// import { defineEmits, defineProps } from "vue";
import { defineEmits, defineProps } from "../../../../../../adapter-vue";
const emits = defineEmits(["click"]);
const props = defineProps({
  file: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "20px",
  },
  height: {
    type: String,
    default: "20px",
  },
  isApp: {
    type: Boolean,
    default: false,
  },
});
const handlerImgClick = () => {
  emits("click");
};
</script>
<style lang="css" scoped src="./style/icon.css"></style>
