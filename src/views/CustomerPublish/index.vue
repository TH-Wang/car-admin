e<template>
  <div>
    <!-- 顶部 -->
    <a-space size="large" style="margin-bottom: 10px">
    </a-space>
    <!-- 表格 -->
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
    >
      <!-- 操作按钮 -->
      <!-- <template #handle="{row}">
        <a-space>
          <el-button type="text" @click="handleUpdate(row.id)">修改</el-button>
        </a-space>
      </template> -->
    </table-display>
    <!-- 表单弹窗 -->
    <!-- <dialog-form
      ref="form"
      :visible="visible"
      :mode="dialogMode"
      :loading="loading"
      @close="visible = false"
      @submit="handleConfirm"
    /> -->
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import tableConfig from './tableConfig'
// import DialogForm from './DialogForm'

export default {
  // components: { DialogForm },
  data: () => ({
    dialogMode: 'edit',
    loading: false,
    visible: false,
    columns: tableConfig,
    list: [],
    form: {}
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.selectCustomerPublishList({ startPage: num, pageSize: size })
      // const { list, total } = res.data.data
      // return { data: list, total }
      const data = res.data.data.map(item => {
        const { passengerOrder, user, passPoints } = item
        return {
          username: user?.username,
          ...passengerOrder,
          passPoints
        }
      })
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
        // 处理途径点数据
        const ori = cloneDeep(this.list.find(i => i.id === id))
        ori.startAddr = ori.passPointList.find(i => i.type === 1)
        ori.endAddr = ori.passPointList.find(i => i.type === 3)
        ori.passPointList = ori.passPointList.filter(i => i.type === 2)
        // 设置表单字段
        this.$refs.form.setFields(ori)
      })
    },
    // 点击确认按钮
    async handleConfirm (values) {
      // 处理请求参数
      const data = this.handleParams(values)
      // 发送请求
      this.loading = true
      try {
        await this.$api.updateDriverPublish(data)
        this.$message.success('操作成功')
        this.$refs.table.update()
      } catch (error) {
        console.log(error)
        this.$message.error('操作失败，请稍后再试')
      } finally {
        this.loading = false
        this.visible = false
      }
    },
    // 处理请求数据
    handleParams (values) {
      const data = cloneDeep(values)
      const { startAddr, endAddr } = data
      data.passPointList = data.passPointList.map(i => ({ ...i, type: 2 }))
      data.passPointList.unshift({ ...startAddr, type: 1 })
      data.passPointList.push({ ...endAddr, type: 3 })
      data.passPointList = data.passPointList.map((i, idx) => ({ ...i, sort: idx }))
      delete data.startAddr
      delete data.endAddr
      return data
    },
    // 删除
    async handleDelete (id) {
      try {
        await this.$api.deleteBus(id)
        this.$message.success('删除成功')
        this.$refs.table.refresh()
      } catch (error) {
        this.$message.error('删除失败，请稍后再试')
      }
    }
  }
}
</script>
