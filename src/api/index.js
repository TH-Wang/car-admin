import authApi from './auth'
import userApi from './user'
import lineApi from './line'

export default {
  ...authApi,
  ...userApi,
  ...lineApi
}
