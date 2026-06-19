<script setup>
import { useUserStore } from './stores/user'

const userStore = useUserStore()
</script>

<template>
  <div>测试</div>
  <el-button type="primary">确认</el-button>
  <h1>{{ userStore.token }}</h1>
  <el-button @click="userStore.setToken('112ddwefwfwefwef')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>
</template>

<style scoped></style>
