import axios from './http'
import { getUserId } from './utils'

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
  console.log(getUserId())
  // return axios({
  //   url: '/web/ratio/updateRevenueRatioRule',
  //   method: 'POST',
  //   params: {
  //     adminId: getUserId(),
  //     ...params
  //   }
  // })
}
