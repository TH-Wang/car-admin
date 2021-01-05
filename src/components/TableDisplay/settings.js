// settings render
// use 'this' together with index

export default function (h) {
  const _this_ = this
  const settingSize = 'mini'
  const { size, tableSize, stripe, border } = this
  return h(
    'a-space',
    // { props: { size: 'middle' } },
    [
      '样式设置',
      // 大小
      h(
        'el-select',
        {
          style: { width: '80px' },
          props: { value: size, size: settingSize, align: 'center' },
          on: {
            change: val => {
              _this_.$emit('size-change', val)
              _this_.size = val
            }
          }
        },
        tableSize.map(item => h(
          'el-option', {
            props: { label: item[1], value: item[0] }
          }
        ))
      ),
      h( // 斑马纹
        'el-checkbox',
        {
          props: {
            value: stripe,
            size: settingSize,
            border: true,
            label: '斑马纹'
          },
          on: { change: val => { _this_.stripe = val } }
        }
      ),
      h( // 边框
        'el-checkbox',
        {
          props: {
            value: border,
            size: settingSize,
            border: true,
            label: '边框'
          },
          on: { change: val => { _this_.border = val } }
        }
      )
    ]
  )
}
