<template>
  <el-autocomplete
    v-model="state"
    clearable
    :fetch-suggestions="queryAddress"
    placeholder="请输入内容"
    @select="handleSelect"
    @change="handleChange"
  />
</template>

<script>
import { isEmpty } from 'lodash'

const datas = [
  { value: '重庆时代天街', id: 0 },
  { value: '观音桥', id: 1 },
  { value: '大坪医院', id: 2 },
  { value: '鱼洞', id: 0 },
  { value: '巴南万达广场', id: 1 },
  { value: '重庆时代天街', id: 2 },
  { value: '重庆时代天街', id: 0 },
  { value: '重庆时代天街', id: 1 },
  { value: '重庆时代天街', id: 2 }
]

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Object
  },
  data: () => ({
    state: ''
  }),
  methods: {
    handleSelect (data) {
      this.$emit('change', data)
    },
    handleChange (str) {
      if (isEmpty(str)) this.$emit('change', {})
    },
    async queryAddress (str, resolve) {
      setTimeout(() => {
        resolve(datas || [])
      }, 1000)
    }
  }
}
</script>

<style>

</style>
