<template>
  <div>
    <!-- 表格主体 -->
    <table-display
      ref="table"
      :columns="columns"
      v-model="list"
      :query-func="handleRequest"
      @size-change="(val) => {tableSize = val}">
      <!-- 头像 -->
      <template #avatar="{ row }">
        <div
          class="avatar-container"
          :style="{ width: `${avatarSize}px`, height: `${avatarSize}px` }"
          @click="handlePreviewAvatar(row)">
          <el-avatar
            style="cursor:pointer"
            fit="cover"
            shape="square"
            :size="avatarSize"
            :src="row.headimg"/>
        </div>
      </template>
      <!-- 身份标签 -->
      <template #auth="{ row }">
        <!-- <a-space> -->
          <a-tag color="green" v-if="row.idnumstatus === 'YES'">身份证</a-tag>
          <a-tag color="blue" v-if="row.driverlicensestatus === 'YES'">驾驶证</a-tag>
          <a-tag color="orange" v-if="row.carstatus === 'YES'">车辆认证</a-tag>
          <span v-if="unAuth(row)">无</span>
        <!-- </a-space> -->
      </template>
      <!-- 操作按钮 -->
      <template #handle="{ row }">
        <el-button
          type="text"
          :size="tableSize"
          @click="handleUpdate(row.id)"
        >修改</el-button>
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
    <!-- 预览头像 -->
    <a-modal
      v-model="previewAvatar.visible"
      :title="previewAvatar.username"
      :bodyStyle="{display: 'flex', justifyContent: 'center'}"
      centered :footer="null">
      <el-image
        style="width:400px;min-height:400px"
        fit="contain"
        :src="previewAvatar.url"/>
    </a-modal>
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
    tableSize: 'medium',
    columns: tableConfig,
    list: [],
    previewAvatar: {
      visible: false,
      username: '',
      url: null
    }
  }),
  computed: {
    avatarSize () {
      const sizeConfig = { medium: 50, small: 40, mini: 30 }
      return sizeConfig[this.tableSize]
    }
  },
  methods: {
    // 数据请求函数
    async handleRequest (num, size) {
      const res = await this.$api.getUserList({ pageNo: num, pageSize: size })
      const { list, total } = res.data.data
      return { data: list, total }
    },
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
        await this.$api.updateUser(this.handleData(data))
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
    // 处理提交数据
    handleData (data) {
      const result = cloneDeep(data)
      for (const key in result) {
        if (!result[key]) delete result[key]
        if (key === 'totalPrice') result[key] = parseInt(result[key])
        if (key === 'faithfulValue') result[key] = parseInt(result[key])
      }
      return result
    },
    // 判断是否没有任何认证信息
    unAuth (row) {
      const { idnumstatus, driverlicensestatus, carstatus } = row
      return idnumstatus === 'NO' &&
             driverlicensestatus === 'NO' &&
             carstatus === 'NO'
    },
    // 预览头像
    handlePreviewAvatar (row) {
      const { username, headimg } = row
      this.previewAvatar = { visible: true, username, url: headimg }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container{
  display: inline-block;
}
</style>
