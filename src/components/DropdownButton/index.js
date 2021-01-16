const triggerStyle = {
  cursor: 'pointer',
  color: '#409EFF'
}

const components = {
  props: {
    menus: {
      type: Array,
      default: () => ([])
    },
    size: {
      type: String,
      default: 'medium'
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  methods: {
    handleCommand (command) {
      this.$emit(command)
    }
  },
  render: function (h) {
    const { menus, ...restProps } = this.$props
    const { $slots, $emit, handleCommand } = this
    // 触发按钮
    const trigger = h(
      'span',
      { style: triggerStyle },
      [
        $slots.default,
        h('i', { class: 'el-icon-arrow-down' })
      ]
    )
    // 下拉菜单
    const dropdownMenu = h('el-dropdown-menu', {
      scopedSlots: {
        default: () => menus.map(item => {
          const { text, ...itemProps } = item
          return h(
            'el-dropdown-item',
            { props: itemProps, slot: 'dropdown' },
            text
          )
        })
      }
    })
    // root组件
    return h(
      'el-dropdown',
      {
        props: { disabled: false, ...restProps },
        on: {
          click: () => { $emit('click') },
          command: handleCommand
        }
      },
      [trigger, dropdownMenu]
    )
  }
}

export default {
  install: function (Vue) {
    Vue.component('dropdown-button', components)
  }
}
