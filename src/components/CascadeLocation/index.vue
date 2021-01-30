<template>
  <el-cascader
    :props="lazyProps"
    placeholder="全国"
    clearable
    @change="handleChange"
  />
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Number
  },
  data () {
    const _this_ = this
    return {
      lazyProps: {
        lazy: true,
        lazyLoad: async function (node, resolve) {
          const { level } = node
          const datas = level === 0
            ? await _this_.queryProvinceList(level)
            : await _this_.queryChildrenList(node.data.code, level)
          resolve(datas || [])
        }
      }
    }
  },
  methods: {
    // 请求省列表
    async queryProvinceList (level) {
      const res = await this.$api.queryProvinceList()
      return res.data.data.map(item => ({
        ...item,
        value: item.code,
        label: item.name,
        leaf: level >= 2
      }))
    },
    // 请求子级地点列表
    async queryChildrenList (code, level) {
      const res = await this.$api.queryPositionForCounty(code)
      return res.data.data.map(item => ({
        ...item,
        value: item.code,
        label: item.name,
        leaf: level >= 2
      }))
    },
    // 选择地点
    handleChange (value) {
      this.$emit('change', value[2])
    }
  }
}
</script>
