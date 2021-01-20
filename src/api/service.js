import axios from './http'

export default {
  getServiceInfo,
  insertServiceInfo,
  updateServiceInfo
}

// 获取客服信息
function getServiceInfo () {
  return axios.get('/web/carService/query')
}

// 添加客服信息
function insertServiceInfo (params) {
  return axios({
    url: '/web/carService/add',
    method: 'POST',
    params
  })
}

// 修改客服信息
function updateServiceInfo (params) {
  return axios({
    url: '/web/carService/update',
    method: 'POST',
    params
  })
}
