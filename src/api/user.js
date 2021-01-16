import axios from './http'
import { getUserId } from './utils'

export default { getUserList, updateUser, presentIntegral }

// 获取用户列表
function getUserList ({ pageNo, pageSize }) {
  return axios.post('/web/user/list', { pageNo, pageSize, userId: getUserId() })
}

// 修改用户信息
function updateUser (data) {
  return axios({
    url: 'web/user/update',
    method: 'POST',
    data,
    params: { userId: getUserId() }
  })
}

// 赠送积分
function presentIntegral (params) {
  return axios({
    url: '/web/ratio/presentIntegral',
    method: 'POST',
    params
  })
}
