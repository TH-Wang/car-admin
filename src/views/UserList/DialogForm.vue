<template>
  <el-dialog
    :title="mode === 'add' ? '添加' : '修改'"
    :visible="visible"
    @close="$emit('close')"
    width="600px">
    <el-form
      ref="form"
      label-position="right"
      label-width="100px"
      class="dialog-form">

      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
          :action="uploadUrl"
          name="file"
          :show-file-list="false"
          :on-success="handleFileSuccess">
          <el-button type="primary" size="small">选择图片</el-button>
        </el-upload>
        <div><img class="upload-img" :src="headimg" alt=""/></div>
      </el-form-item>

      <el-form-item label="手机号码">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>
    </el-form>
    <!-- 弹窗底部 -->
    <template #footer>
      <a-space>
        <el-button @click="$emit('close')">取消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleConfirm">{{loading ? '提交中' : '确认'}}</el-button>
      </a-space>
    </template>
  </el-dialog>
</template>

<script>
import { file } from '@/config/base-url'

export default {
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    form: {},
    headimg: '',
    uploadUrl: file
  }),
  methods: {
    reset () {
      this.form = {}
      this.headimg = ''
    },
    setFields (data) {
      this.form = data
      this.headimg = data.headimg
    },
    handleConfirm () {
      this.$emit('submit', this.form)
    },
    // 上传图片发送改变
    handleFileSuccess (res) {
      console.log(res)
      this.form.headimg = res.data
      this.headimg = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img{
  width: 100px;
  margin-top: 10px;
}
</style>
