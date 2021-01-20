<template>
  <!-- 状态筛选 -->
  <a-space style="margin-bottom:15px">
    <span>筛选：</span>
    <el-select
      v-model="state"
      placeholder="全部"
      size="small"
      clearable
      style="width:150px"
      @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </a-space>
</template>

<script>
import { isInteger } from 'lodash'

export default {
  data: () => ({
    state: null,
    options: [
      { label: '待审核', value: 0 },
      { label: '已通过审核', value: 1 },
      { label: '未通过审核', value: 2 }
    ]
  }),
  methods: {
    handleChange (value) {
      const state = isInteger(value) ? value : null
      this.state = state
      this.$emit('change', state)
    }
  }
}
</script>
