<template>
  <table-display
    ref="table"
    :columns="columns"
    v-model="list"
    :query-func="handleRequest"
  >
    <!-- 详情 -->
    <template #expand="{row}">
      <div class="table-expand">
        <div><span class="label">支付金额：</span>{{row.price}}</div>
        <div><span class="label">支付方式：</span>
          <strong :style="{color: payType[row.payType].color}">
            {{payType[row.payType].text}}
          </strong>
        </div>
        <div><span class="label">支付时间：</span>{{row.creationTime}}</div>
      </div>
    </template>
    <!-- 支付状态 -->
    <template #state="{row}">
      <a-tag v-if="row.orderStatus === 1" color="blue">支付成功</a-tag>
      <a-tag v-else color="red">支付失败</a-tag>
    </template>
  </table-display>
</template>

<script>
import tableConfig from './tableConfig'

export default {
  data: () => ({
    columns: tableConfig,
    list: [],
    payType: { 1: { text: '支付宝', color: 'blue' }, 2: { text: '微信', color: 'green' } }
  }),
  methods: {
    // 请求列表
    async handleRequest (num, size) {
      const res = await this.$api.getOrderList({
        pageNo: num,
        pageSize: size,
        orderType: 1
      })
      const { list, total } = res.data.data
      return { data: list, total }
    }
  }
}
</script>
