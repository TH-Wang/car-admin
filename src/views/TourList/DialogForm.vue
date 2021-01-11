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

      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>

      <el-form-item label="类别">
        <el-select v-model="form.tourNameId">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
          :action="uploadUrl"
          name="file"
          :show-file-list="false"
          :on-success="handleFileSuccess">
          <el-button type="primary" size="small">选择图片</el-button>
        </el-upload>
        <div><img class="upload-img" :src="img" alt=""/></div>
      </el-form-item>

      <el-form-item label="价格">
        <el-input v-model="form.price" placeholder="请输入价格">
          <template #prepend>￥</template>
        </el-input>
      </el-form-item>

      <el-form-item label="目的地">
        <el-input v-model="form.destination" placeholder="请输入目的地" />
      </el-form-item>

      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="说明">
        <el-input v-model="form.details" type="textarea" placeholder="请输入详细说明" />
      </el-form-item>

      <el-form-item label="详情图片">
        <el-upload
          :action="uploadUrl"
          name="file"
          :show-file-list="false"
          :on-success="handleDetailFileSuccess">
          <el-button type="primary" size="small">选择图片</el-button>
        </el-upload>
        <div><img class="upload-detail-img" :src="detailsImg" alt=""/></div>
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
    },
    typeList: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    form: {},
    img: '',
    detailsImg: '',
    uploadUrl: file
  }),
  methods: {
    // 上传图片发送改变
    handleFileSuccess (res) {
      console.log(res)
      this.form.img = res.data
      this.img = res.data
    },
    // 上传详情图片发送改变
    handleDetailFileSuccess (res) {
      console.log(res)
      this.form.detailsImg = res.data
      this.detailsImg = res.data
    },
    reset () {
      this.form = {}
      this.img = ''
      this.detailsImg = ''
    },
    setFields (data) {
      this.form = data
      this.img = data.img
      this.detailsImg = data.detailsImg
    },
    handleConfirm () {
      this.$emit('submit', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-img{
  width: 100px;
  margin-top: 10px;
}
.upload-detail-img{
  width: 200px;
  margin-top: 10px;
}
</style>
