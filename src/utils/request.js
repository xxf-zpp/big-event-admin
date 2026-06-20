import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'https://big-event-vue-api-t.itheima.net'

const request = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

request.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

request.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    // 业务失败
    ElMessage.error(res.data.message || '服务异常！')
    return Promise.reject(res.data)
  },
  (err) => {
    // 处理401错误,权限问题，跳转到到登录
    if (err.response?.status === 401) {
      router.push('/login')
      ElMessage.warning('请登录！')
    }
    // 错误的默认情况
    ElMessage.error(err.response.data.message || '服务异常！')
    return Promise.reject(err)
  }
)

export default request
export { baseURL }
