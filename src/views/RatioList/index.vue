e<template>
  <div>
    <!-- 表格 -->
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
      style="width:1000px"
    >
      <!-- 操作按钮 -->
      <template #handle="{row}">
        <el-button type="primary" size="mini" @click="handleUpdate(row.id)">修改</el-button>
      </template>
    </table-display>
    <!-- 表单弹窗 -->
    <dialog-form
      ref="form"
      :visible="visible"
      mode="update"
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
    form: {}
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getRatioList()
      const data = res.data.data
      return { data, total: data.length }
    },
    // 修改
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
        const res = await this.$api.updateRatio(data)
        if (res.data.status === 200) {
          this.$message.success('操作成功')
          this.$refs.table.refresh()
        } else {
          this.$message.error(`${res.data.msg}，请稍后再试`)
        }
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
