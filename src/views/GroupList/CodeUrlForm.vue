<template>
  <el-dialog
    title="上传群二维码"
    :visible="visible"
    @close="$emit('close')"
    width="600px">
    <el-form
      ref="form"
      label-position="right"
      label-width="100px"
      class="dialog-form"
    >
      <el-form-item label="群二维码">
        <el-upload
          :action="uploadUrl"
          name="file"
          :show-file-list="false"
          :on-success="handleFileSuccess">
          <el-button type="primary" size="small">选择图片</el-button>
        </el-upload>
        <div><img class="upload-img" :src="img" alt=""/></div>
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
    img: '',
    uploadUrl: file
  }),
  methods: {
    reset () {
      this.img = ''
    },
    setFields (data) {
      this.img = data
    },
    handleFileSuccess (res) {
      this.img = res.data
    },
    handleConfirm () {
      this.$emit('submit', this.img)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img{
  width: 120px;
  height: 120px;
  margin-top: 10px;
}
</style>
