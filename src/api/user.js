import request from '@/utils/request'

// 用户注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 用户登录
export const userLoginService = ({ username, password }) => {
  return request.post('api/login', { username, password })
}

// 获取用户基本信息
export const userGetUserInfoService = () => {
  return request.get('/my/userinfo')
}
