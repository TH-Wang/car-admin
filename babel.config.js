module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // element-ui按需引入
    [
      'component',
      { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }
    ],
    // antd-vue按需引入
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }
    ]
  ]
}
