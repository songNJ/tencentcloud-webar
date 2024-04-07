<template>
  <TUICallKit></TUICallKit>
  <view class="loginBox">
    <input
      class="input-box"
      v-model="userID"
      :placeholder="!isLogin ? '请输入用户ID' : '搜索用户ID'"
      placeholder-style="color:#BBBBBB;"
    />
    <view class="login">
      <button
        class="loginBtn"
        @click="!isLogin ? loginHandler() : callHandler()"
      >
        {{ !isLogin ? "登录" : "呼叫" }}
      </button>
    </view>
  </view>
</template>
<script setup>
import { ref } from "vue";
import * as GenerateTestUserSig from "../../TUICallKit/debug/GenerateTestUserSig-es.js";
import { TUICallKitServer } from "../../TUICallKit/src/index";
import TUICallKit from "../../TUICallKit/src/Components/TUICallKit";
let userID = ref("");
let isLogin = ref(false);
const loginHandler = async () => {
  if (!userID.value) return;
  const { userSig, SDKAppID } = GenerateTestUserSig.genTestUserSig({
    userID: userID.value,
  });
  await TUICallKitServer.init({
    sdkAppID: SDKAppID,
    userID: userID.value,
    userSig: userSig,
  });
  isLogin.value = true;
  userID.value = "";
};

const callHandler = async () => {
  await TUICallKitServer.call({
    userID: userID.value,
    type: 2,
  });
};
</script>
<style>
.loginBox {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  display: flex;
  font-size: 20px;
}

.login {
  width: 100vw;
  bottom: 5vh;
  margin: 70rpx;
}

.login button {
  width: 80%;
  background-color: #006eff;
  border-radius: 50px;
  color: white;
}
</style>
