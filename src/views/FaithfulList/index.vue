e<template>
  <div>
    <!-- 顶部 -->
    <a-space size="large" style="margin-bottom: 10px">
      <el-button size="samll" type="primary" @click="handleAdd">添加规则</el-button>
    </a-space>
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
        <a-space>
          <el-button type="primary" size="mini" @click="handleUpdate(row.id)">修改</el-button>
          <popconfirm-button
            :button="{size: 'mini', type: 'danger'}"
            title="确认删除该包车信息"
            @confirm="handleDelete(row.id)"
          >删除</popconfirm-button>
        </a-space>
      </template>
    </table-display>
    <!-- 表单弹窗 -->
    <dialog-form
      ref="form"
      :visible="visible"
      :mode="dialogMode"
      :loading="loading"
      @close="visible = false"
      @submit="handleConfirm"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import tableConfig from './tableConfig'
import PopconfirmButton from '@/components/PopconfirmButton'
import DialogForm from './DialogForm'

export default {
  components: { PopconfirmButton, DialogForm },
  data: () => ({
    dialogMode: 'add',
    loading: false,
    visible: false,
    columns: tableConfig,
    list: [],
    form: {}
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getFaithfulList()
      const data = res.data.data
      return { data, total: data.length }
    },
    // 添加
    handleAdd () {
      this.dialogMode = 'add'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    // 修改
    handleUpdate (id) {
      this.dialogMode = 'update'
      this.visible = true
      this.$nextTick(() => {
        this.$refs.form.setFields(cloneDeep(this.list.find(i => i.id === id)))
      })
    },
    // 点击确认按钮
    async handleConfirm (data) {
      this.loading = true
      try {
        if (this.dialogMode === 'add') {
          await this.$api.createFaithful(data)
        } else {
          await this.$api.updateFaithful(data)
        }
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      } catch (error) {
        console.log(error)
        this.$message.error('操作失败，请稍后再试')
      } finally {
        this.loading = false
        this.visible = false
      }
    },
    // 删除
    async handleDelete (id) {
      try {
        await this.$api.deleteFaithful(id)
        this.$message.success('删除成功')
        this.$refs.table.refresh()
      } catch (error) {
        this.$message.error('删除失败，请稍后再试')
      }
    }
  }
}
</script>
