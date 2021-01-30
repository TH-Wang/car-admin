import authApi from './auth'
import userApi from './user'
import lineApi from './line'
import tourApi from './tour'
import busApi from './bus'
import checkApi from './check'
import faithfulApi from './faithful'
import ratioApi from './ratio'
import orderApi from './order'
import serviceApi from './service'
import verificationApi from './verification'
import complaintApi from './complaint'
import positionApi from './position'
import publishApi from './publish'
import shortLinkApi from './shortLink'

export default {
  ...authApi,
  ...userApi,
  ...lineApi,
  ...tourApi,
  ...busApi,
  ...checkApi,
  ...faithfulApi,
  ...ratioApi,
  ...orderApi,
  ...serviceApi,
  ...verificationApi,
  ...complaintApi,
  ...positionApi,
  ...publishApi,
  ...shortLinkApi
}
