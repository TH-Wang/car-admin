<template>
  <div class="container">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <template v-for="item in list">
        <!-- 普通菜单 -->
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon :type="item.icon" />
          <span>{{ item.title }}</span>
        </a-menu-item>
        <!-- 有子菜单 -->
        <a-sub-menu v-else :key="item.key">
          <template #title>
            <a-icon :type="item.icon" /><span>{{item.title}}</span>
          </template>
          <a-menu-item :key="el.key" v-for="el in item.children">
            {{ el.title }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import menuConfig from './menuConfig'

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    list: menuConfig
  })
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
}
</style>
