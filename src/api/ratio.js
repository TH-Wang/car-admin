import axios from './http'

export default {
  getRatioList,
  updateRatio
}

// 旅游列表
function getRatioList () {
  return axios.get('/web/ratio/getRevenueRatioRule')
}

// 修改旅游
function updateRatio (params) {
  return axios({
    url: '/web/ratio/updateRevenueRatioRule',
    method: 'POST',
    params
  })
}
