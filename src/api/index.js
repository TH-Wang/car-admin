import authApi from './auth'
import userApi from './user'

export default {
  ...authApi,
  ...userApi
}
