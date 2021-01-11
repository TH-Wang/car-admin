import axios from './http'
import { getUserId } from './utils'

export default {
  getOrderList
}

// 获取订单列表
function getOrderList (data) {
  return axios.post('/web/order/queryListOrder', { ...data, userId: getUserId() })
}
