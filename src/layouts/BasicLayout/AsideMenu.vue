<template>
  <div class="container">
    <a-menu
      mode="inline"
      theme="dark"
      v-model="selectedKeys"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in list">
        <!-- 普通菜单 -->
        <a-menu-item v-if="!item.children" :key="item.key" @click="link(item)">
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <!-- 有子菜单 -->
        <a-sub-menu v-else :key="item.key">
          <template #title>
            <a-icon :type="item.icon" /><span>{{item.title}}</span>
          </template>
          <a-menu-item v-for="el in item.children" :key="el.key" @click="link(el)">
            {{ el.title }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import menuConfig from '@/config/aside-menu'

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    list: menuConfig,
    selectedKeys: ['1']
  }),
  methods: {
    link (info) {
      if (info.key === this.selectedKeys[0]) return
      this.$router.push(info.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
}
</style>
