import axios from './http'

export default {
  queryUserIdentityCard,
  queryUserDrivingCard,
  queryUserCarVerification,
  checkUserIdentityCard,
  checkUserDrivingCard,
  checkUserCarVerification
}

// 身份证验证查询
function queryUserIdentityCard (params) {
  return axios({
    url: '/web/verification/queryUserIdentityCard',
    method: 'POST',
    params
  })
}

// 驾驶证验证查询
function queryUserDrivingCard (params) {
  return axios({
    url: '/web/verification/queryUserDrivingCard',
    method: 'POST',
    params
  })
}

// 车辆验证查询
function queryUserCarVerification (params) {
  return axios({
    url: '/web/verification/queryUserCarVerification',
    method: 'POST',
    params
  })
}

// 审核身份证验证
function checkUserIdentityCard (params) {
  return axios({
    url: '/web/verification/checkUserIdentityCard',
    method: 'POST',
    params
  })
}

// 审核驾驶证验证
function checkUserDrivingCard (params) {
  return axios({
    url: '/web/verification/checkUserDrivingCard',
    method: 'POST',
    params
  })
}

// 审核车辆验证
function checkUserCarVerification (params) {
  return axios({
    url: '/web/verification/checkUserCarVerification',
    method: 'POST',
    params
  })
}
