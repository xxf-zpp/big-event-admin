import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetUserInfoService } from '@/api/user'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref({})
    const getUserInfo = async () => {
      const res = await userGetUserInfoService()
      userInfo.value = res.data.data
    }
    const setUser = (obj) => (userInfo.value = obj)

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true // 持久化
  }
)
