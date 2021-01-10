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

      <el-form-item label="车型名称">
        <el-input v-model="form.carName" placeholder="请输入车型名称" />
      </el-form-item>

      <el-form-item label="类别">
        <el-select v-model="form.carTypeId">
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
        <el-input v-model="form.price" placeholder="请输入包车价格">
          <template #prepend>￥</template>
        </el-input>
      </el-form-item>

      <el-form-item label="载重">
        <el-input v-model="form.load" placeholder="请输入载重">
          <template #append>kg</template>
        </el-input>
      </el-form-item>

      <el-form-item label="长宽高">
        <el-input v-model="form.widthHeight" placeholder="请输入长宽高">
          <template #append>m</template>
        </el-input>
      </el-form-item>

      <el-form-item label="容积">
        <el-input v-model="form.volume" placeholder="请输入容积">
          <template #append>m³</template>
        </el-input>
      </el-form-item>

      <el-form-item label="服务开始时间">
        <el-select v-model="form.startWeek">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="服务结束时间">
        <el-select v-model="form.endWeek">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="说明">
        <el-input v-model="form.title" type="textarea" placeholder="请输入详细说明" />
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
    }
  },
  data: () => ({
    form: {},
    img: '',
    detailsImg: '',
    typeList: [],
    uploadUrl: file,
    options: [
      { value: 0, label: '周日' },
      { value: 1, label: '周一' },
      { value: 2, label: '周二' },
      { value: 3, label: '周三' },
      { value: 4, label: '周四' },
      { value: 5, label: '周五' },
      { value: 6, label: '周六' }
    ]
  }),
  methods: {
    // 请求类别
    async handleReqType () {
      const res = await this.$api.getBusTypeList()
      this.typeList = res.data.data.map(item => ({ value: item.id, label: item.typeName }))
    },
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
  },
  created () {
    this.handleReqType()
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
