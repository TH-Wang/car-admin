<template>
  <div>
    <div class="field-item" v-for="(item, index) in value" :key="index">
      <search-address
        :value="item"
        :placeholder="`请输入第${index + 1}个地点`"
        @change="handleChange($event, index)"
        style="flex:1"
      />
      <i class="el-icon-remove-outline" @click="remove" />
    </div>
    <el-button size="small" @click="add">添加</el-button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [Object, Array]
  },
  methods: {
    add () {
      const ori = cloneDeep(this.value)
      ori.push({})
      this.$emit('change', ori)
    },
    remove (index) {
      const ori = cloneDeep(this.value)
      ori.splice(index, 1)
      this.$emit('change', ori)
    },
    handleChange (values, index) {
      const ori = cloneDeep(this.value)
      ori.splice(index, 1, values)
      this.$emit('change', ori)
    }
  }
}
</script>

<style lang="scss" scoped>
.field-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  i{
    margin-left: 8px;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>
