<script setup>
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const Logo = new URL('@/assets/logo2.png', import.meta.url).href
const isLogin = ref(true)

const formData = ref({
  username: '',
  password: '',
  repassword: ''
})

const removeFormData = () => {
  formData.value.username = ''
  formData.value.password = ''
  formData.value.repassword = ''
}

// 切换登录注册
const LoginSwitch = () => {
  isLogin.value = !isLogin.value
}

// 注册提交
const register_submit = async () => {
  const res = await userRegisterService(formData.value)
  removeFormData()
  LoginSwitch()
  ElMessage.success(res.data.message)
}

const userStore = useUserStore()

// 登录提交
const login_submit = async () => {
  // 发送登录请求
  const res = await userLoginService(formData.value)
  removeFormData()
  // 保存token信息
  userStore.setToken(res.data.token)
  // 提示成功
  ElMessage.success(res.data.message)
  // 页面跳转
  router.push('/')
}
</script>

<template>
  <div class="container">
    <div class="bg-container">
      <img :src="Logo" alt="登录页logo" />
    </div>
    <div class="login-or-register">
      <div v-if="isLogin" class="login">
        <h1>登录</h1>
        <input
          v-model="formData.username"
          type="text"
          class="content-input"
          placeholder="请输入用户名"
        />
        <input
          v-model="formData.password"
          type="password"
          class="content-input"
          placeholder="请输入密码"
        />
        <div class="more">
          <div class="left"><input type="checkbox" class="login-check" /><span>记住我</span></div>
          <a href="#">忘记密码</a>
        </div>
        <button @click="login_submit()">登录</button>
        <span class="go" @click="LoginSwitch()">去注册&nbsp;-&gt;</span>
      </div>
      <div v-else class="register">
        <h1>注册</h1>
        <input
          v-model="formData.username"
          type="text"
          class="content-input"
          placeholder="请输入用户名"
        />
        <input
          v-model="formData.password"
          type="password"
          class="content-input"
          placeholder="请输入密码"
        />
        <input
          v-model="formData.repassword"
          type="password"
          class="content-input"
          placeholder="请再次输入密码"
        />
        <button @click="register_submit()">注册</button>
        <span class="go" @click="LoginSwitch()">&lt;-去登录</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  // background-color: skyblue;
  display: flex;

  .bg-container {
    width: 50%;
    height: 100%;
    // background-color: orange;
    background-image: url('/src/assets/login_bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 0 30px 30px 0;
    box-shadow: 0 0 20px black;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 320px;
      object-fit: contain;
    }
  }

  .login-or-register {
    width: 50%;
    height: 100%;
    // background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;

    .login,
    .register {
      width: 320px;
      height: 400px;
      //   background-color: skyblue;
      display: flex;
      flex-direction: column;
      .content-input {
        height: 38px;
        border: 2px solid #5a5858;
        margin: 15px 0;
        padding: 0 10px;
      }
      .more {
        width: 100%;
        margin: 20px 0;
        // background-color: orange;
        display: flex;
        justify-content: space-between;
        a {
          text-decoration-line: none;
          color: deepskyblue;
          font-weight: bold;
        }
      }
      button {
        height: 38px;
        margin: 15px 0;
        font-size: 18px;
        background-color: deepskyblue;
        color: white;
        border: 0;
      }
      .go:hover {
        cursor: pointer;
        color: deepskyblue;
      }
    }
  }
}
</style>
