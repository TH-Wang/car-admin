<template>
  <el-autocomplete
    v-model="state"
    clearable
    :fetch-suggestions="queryAddress"
    :placeholder="placeholder"
    @select="handleSelect"
    @change="handleChange"
    style="width:100%"
  >
    <!-- 自定义结果 -->
    <template v-slot:default="{ item }">
      <div class="name">{{item.data.name}}</div>
      <div class="address">{{item.data.address}}</div>
    </template>
    <template #prepend>
      <el-select v-model="cityname" style="width:90px">
        <el-option
          v-for="(item, index) in pnameList"
          :key="index"
          :value="item"
          :label="item"
        />
      </el-select>
    </template>
  </el-autocomplete>
</template>

<script>
import { isEmpty } from 'lodash'
const pnameList = [
  '北京', '天津', '重庆', '上海', '广东', '河北', '山西', '内蒙古', '四川', '辽宁', '江苏',
  '吉林', '黑龙江', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广西',
  '海南', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港', '澳门', '台湾'
]

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Object,
    placeholder: String
  },
  data: () => ({
    state: '',
    cityname: '重庆',
    pnameList,
    // 地点搜索类
    placeSearch: null
  }),
  methods: {
    // 更新搜索类
    updatePlaceSearch () {
      const city = this.cityname
      window.AMap.plugin('AMap.PlaceSearch', () => {
        this.placeSearch = new window.AMap.PlaceSearch({
          pageSize: 10,
          pageIndex: 1,
          city: city || '全国'
        })
      })
    },
    // 选择地点
    handleSelect ({ data }) {
      const _this_ = this
      const { lng, lat } = data.location
      const pointName = data.name
      const city = this.cityname
      // 通过经纬度逆编码，获取详细信息
      window.AMap.plugin('AMap.Geocoder', () => {
        const geocoder = new window.AMap.Geocoder({ city })
        geocoder.getAddress([lng, lat], (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            const { province, city, district, township } = result.regeocode.addressComponent
            const data = {
              pname: province,
              cityname: city || province,
              adname: district,
              township,
              pointName,
              lon: lng,
              lat
            }
            _this_.$emit('change', data)
          }
        })
      })
    },
    handleChange (str) {
      if (isEmpty(str)) this.$emit('change', {})
    },
    async queryAddress (str, resolve) {
      this.placeSearch.search(str, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result.poiList.pois.map(i => ({ value: i.name, data: i })))
        } else {
          resolve([])
        }
      })
    }
  },
  created () {
    this.updatePlaceSearch()
  },
  watch: {
    cityname: function (newVal) {
      this.placeSearch = new window.AMap.PlaceSearch({ city: newVal })
    },
    value: function (newVal) {
      this.state = newVal.pointName
      this.cityname = newVal.pname
    }
  }
}
</script>

<style lang="scss" scoped>
.name{
  font-size: 14px;
  height: 20px;
}
.address{
  font-size: 12px;
  color: #999;
}
</style>
