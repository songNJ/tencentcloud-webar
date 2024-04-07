<template>
  <span class="text">{{ callDuration }}</span>
</template>

<script lang="ts" setup>
const props = defineProps({
  callDuration: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.text {
  display: block;
  margin-bottom: 20px;
}
</style>
