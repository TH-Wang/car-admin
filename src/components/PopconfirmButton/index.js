import Vue from 'vue'

export default Vue.component('popconfirm-button', {
  name: 'popconfirm-button',
  props: {
    button: { type: Object, default: () => ({}) },
    title: { type: String, default: '确认' },
    confirmButtonText: { type: String, default: '确认' },
    cancelButtonText: { type: String, default: '取消' },
    confirmButtonType: { type: String, default: 'primary' },
    cancelButtonType: { type: String, default: 'text' },
    // info: 信息, warning: 警告, danger: 危险
    iconType: { type: String, default: 'question' },
    iconColor: { type: String, default: null },
    hideIcon: { type: Boolean, default: false }
  },
  data: () => ({
    iconConfig: {
      question: { name: 'el-icon-question', color: '#f90' },
      info: { name: 'el-icon-info', color: 'blue' },
      warning: { name: 'el-icon-warning', color: 'orange' },
      danger: { name: 'el-icon-error', color: 'red' }
    }
  }),
  render (h) {
    const _this_ = this
    const {
      button,
      title,
      confirmButtonText,
      cancelButtonText,
      confirmButtonType,
      cancelButtonType,
      hideIcon
    } = this
    // 传入popconfirm的props
    const popconfirmProps = {
      title,
      confirmButtonText,
      cancelButtonText,
      confirmButtonType,
      cancelButtonType
    }
    if (hideIcon) {
      popconfirmProps.hideIcon = true
    } else {
      // 判断icon类型及颜色
      // 传入的icon-type名称优先级最高
      // 传入的icon-color颜色值优先级最高
      const { iconType, iconColor, iconConfig } = this
      let icon = iconType
      let color = null
      if (iconType && iconType in iconConfig) {
        icon = iconConfig[iconType].name
        color = iconColor || iconConfig[iconType].color
      }
      Object.assign(popconfirmProps, { icon, iconColor: color })
    }
    // 触发的button
    const referenceButton = h(
      'el-button',
      { props: button },
      this.$slots.default
    )
    return h(
      'el-popconfirm',
      {
        // attrs: { width: 220 },
        props: popconfirmProps,
        on: {
          confirm: () => { _this_.$emit('confirm') },
          cancel: () => { _this_.$emit('cancel') }
        },
        scopedSlots: {
          reference: () => referenceButton
        }
      }
    )
  }
})
