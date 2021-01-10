import authApi from './auth'
import userApi from './user'
import lineApi from './line'
import tourApi from './tour'
import busApi from './bus'
import checkApi from './check'
import faithfulApi from './faithful'
import ratioApi from './ratio'

export default {
  ...authApi,
  ...userApi,
  ...lineApi,
  ...tourApi,
  ...busApi,
  ...checkApi,
  ...faithfulApi,
  ...ratioApi
}
