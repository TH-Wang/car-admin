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
      <!-- 详情 -->
      <template #expand="{row}">
        <div class="table-expand">
          <div>
            <span class="label">途径点：</span>
            {{row.passPointList.map(i => i.pointName).join(' - ') || '无'}}
          </div>
        </div>
      </template>
      <!-- 订单状态 -->
      <template #state="{row}">
        <div v-html="stateType[row.orderState]"></div>
      </template>
      <!-- 操作按钮 -->
      <template #handle="{row}">
        <a-space>
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
          <el-button type="text" @click="copyToClip(row)">复制</el-button>
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
import moment from 'moment'
import { cloneDeep } from 'lodash'
import tableConfig from './tableConfig'
import DialogForm from './DialogForm'

const shareip = 'http://www.pinchezhijia.com/#'

export default {
  components: { DialogForm },
  data: () => ({
    dialogMode: 'edit',
    loading: false,
    visible: false,
    columns: tableConfig,
    list: [],
    form: {},
    stateType: {
      1: '<span style="color: #409EFF">进行中</span>',
      2: '<span style="color: #999999">已撤下</span>',
      3: '<span style="color: #999999">已完成</span>'
    }
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.selectDriverPublishList({ startPage: num, pageSize: size })
      // const { list, total } = res.data.data
      // return { data: list, total }
      const data = res.data.data.map(item => {
        const { publish, user, passPointList } = item
        return {
          username: user.username,
          ...publish,
          passPointList
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
    handleUpdate (record) {
      this.dialogMode = 'update'
      this.visible = true
      this.$nextTick(() => {
        // 处理途径点数据
        const ori = cloneDeep(record)
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
      // 起点终点、途径点
      const { startAddr, endAddr } = data
      data.passPointList = data.passPointList.map(i => ({ ...i, type: 2 }))
      data.passPointList.unshift({ ...startAddr, type: 1 })
      data.passPointList.push({ ...endAddr, type: 3 })
      data.passPointList = data.passPointList.map((i, idx) => ({ ...i, sort: idx }))
      // 判断发布类型
      data.publishType = this.judgeType(data)
      delete data.startAddr
      delete data.endAddr
      return data
    },
    // 判断拼车单类型
    judgeType (record) {
      if (this.publishType > 3) return record.publishType
      // 起点终点
      const startAddr = record.passPointList.find(i => i.type === 1).pointName
      const endAddr = record.passPointList.find(i => i.type === 3).pointName
      if (startAddr.pname !== endAddr.pname) return 3
      return startAddr.adname === endAddr.adname ? 1 : 2
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
    },
    // 复制到剪切板
    async copyToClip (record) {
      const aux = document.createElement('textarea')
      aux.value = await this.getCopyContent(record)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      this.$message.success('复制成功')
    },
    // 复制内容
    async getCopyContent (record) {
      const { startTime, passPointList, remark } = record
      // 时间
      const formatTime = moment(startTime).format('MM月DD日 HH:mm')
      // 起点终点
      const startAddr = passPointList.find(i => i.type === 1).pointName
      const endAddr = passPointList.find(i => i.type === 3).pointName
      // 途径
      const passList = passPointList.filter(i => i.type === 2).map(i => i.pointName).join('-')
      // 预约
      const link = shareip + '/common/triplink/driver?id=' + this.orderId
      const url = await this.$api.getShortLinkUrl(link)
      return '【拼车】车找人\n' +
        '【路线】' + startAddr + '-' + endAddr + '\n' +
        '【途径】' + (passList || '无') + '\n' +
        '【时间】' + formatTime + '\n' +
        '【预约】' + url + '\n' +
        '【备注】' + (remark || '无')
    }
  }
}
</script>
