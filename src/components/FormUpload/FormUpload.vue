<template>
  <div>
    <el-upload
      :action="uploadUrl"
      name="file"
      :show-file-list="false"
      :on-success="handleDetailFileSuccess">
      <el-button type="primary" size="small">选择图片</el-button>
    </el-upload>
    <div><img class="upload-img" :src="img" alt=""/></div>
  </div>
</template>

<script>
import { file } from '@/config/base-url'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String
  },
  data: () => ({
    uploadUrl: file,
    img: ''
  }),
  methods: {
    // 上传详情图片发送改变
    handleDetailFileSuccess (res) {
      this.$emit('change', res.data)
    }
  },
  watch: {
    value: function (newVal) {
      this.img = newVal
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
