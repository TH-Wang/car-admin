<template>
  <div>
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
    >
      <template #type="{ row }">
        <a-tag v-if="row.publishType === 1">短途拼车</a-tag>
        <a-tag v-else :color="publishConfig[row.publishType][1]">
          {{publishConfig[row.publishType][0]}}
        </a-tag>
      </template>
      <template #handle="{row}">
        <el-button type="text" @click="handleUpdate(row.id)">编辑</el-button>
      </template>
    </table-display>
    <!-- 表单弹窗 -->
    <dialog-form
      ref="form"
      mode="update"
      :visible="visible"
      :loading="loading"
      @close="visible = false"
      @submit="handleConfirm"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import tableConfig from './tableConfig'
import DialogForm from './DialogForm'

export default {
  components: { DialogForm },
  data: () => ({
    loading: false,
    visible: false,
    columns: tableConfig,
    list: [],
    publishConfig: {
      1: ['短途拼车', 'yellow'],
      2: ['城际拼车', 'orange'],
      3: ['跨省拼车', 'red'],
      4: ['上下班拼车', 'green'],
      5: ['顺路带物', 'blue']
    }
  }),
  methods: {
    // 数据请求函数
    async handleRequest (num, size) {
      const res = await this.$api.getLineList({ pageNo: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
    // 修改数据
    handleUpdate (id) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.setFields(cloneDeep(this.list.find(i => i.id === id)))
      })
    },
    // 点击确认按钮
    async handleConfirm (data) {
      this.loading = true
      try {
        await this.$api.updateLine(data)
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      } catch (error) {
        console.log(error)
        this.$message.error('操作失败，请稍后再试')
      } finally {
        this.loading = false
        this.visible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
