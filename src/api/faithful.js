import axios from './http'
import { getUserId } from './utils'

export default {
  getFaithfulList,
  createFaithful,
  updateFaithful,
  deleteFaithful
}

// 旅游列表
function getFaithfulList () {
  return axios.post('/web/faithful/select')
}

// 添加旅游
function createFaithful (data) {
  return axios.post('/web/faithful/insert', { ...data, userId: getUserId() })
}

// 修改旅游
function updateFaithful (data) {
  return axios.post('/web/faithful/update', { ...data, userId: getUserId() })
}

// 删除旅游
function deleteFaithful (id) {
  return axios({
    url: '/web/faithful/delete',
    method: 'POST',
    params: { id, userId: getUserId() }
  })
}
