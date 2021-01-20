<template>
  <div class="table-expand">
    <div>
      <span class="label">车正面照：</span>
      <template v-if="urlIsArray">
        <img
          class="image"
          v-for="(item, index) in row.url"
          :key="index"
          :src="item"/>
      </template>
      <img v-else-if="typeof row.url === 'string'" :src="row.url" alt="">
      <span v-else>未上传</span>
    </div>
  </div>
</template>

<script>
import { isArray } from 'lodash'

export default {
  props: { row: Object },
  computed: {
    urlIsArray () {
      return isArray(this.row.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.image{
  margin-right: 15px;
}
</style>
