import axios from './http'

export default {
  getFaithfulList,
  createFaithful,
  updateFaithful,
  deleteFaithful
}

// 旅游列表
function getFaithfulList (data) {
  return axios.post('/web/faithful/select')
}

// 添加旅游
function createFaithful (data) {
  return axios.post('/web/faithful/insert', data)
}

// 修改旅游
function updateFaithful (data) {
  return axios.post('/web/faithful/update', data)
}

// 删除旅游
function deleteFaithful (id) {
  return axios({
    url: '/web/faithful/delete',
    method: 'POST',
    params: { id }
  })
}
