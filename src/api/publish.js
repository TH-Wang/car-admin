import axios from './http'

export default {
  selectDriverPublishList,
  selectCustomerPublishList,
  updateDriverPublish,
  selectDriverPublishDetail
}

// 通过id查询司机发布信息详情
function selectDriverPublishDetail (id) {
  return axios({
    url: '/web/publish/selectDetailById',
    method: 'POST',
    params: { id }
  })
}

// 获取车主发布信息列表
function selectDriverPublishList (params) {
  return axios({
    url: '/web/publish/selectDriverAll',
    method: 'POST',
    params
  })
}

// 获取车主发布信息列表
function selectCustomerPublishList (params) {
  return axios({
    url: '/web/publish/selectPassengerAll',
    method: 'POST',
    params
  })
}

// 修改司机发布信息
function updateDriverPublish (data) {
  return axios.post('/web/publish/updatePublish', data)
}
