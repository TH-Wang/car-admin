import axios from './http'
import { getUserId } from './utils'

export default { getUserList, updateUser }

// 获取用户列表
function getUserList ({ pageNo, pageSize }) {
  return axios.post('/web/user/list', { pageNo, pageSize, userId: getUserId() })
}

// 修改线路信息
function updateUser (data) {
  return axios({
    url: 'web/user/update',
    method: 'POST',
    data,
    params: { userId: getUserId() }
  })
}
