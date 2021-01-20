import axios from './http'

export default {
  queryComplaint
}

function queryComplaint (params) {
  return axios({
    url: '/web/complaint/query',
    method: 'POST',
    params
  })
}
