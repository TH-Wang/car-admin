const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/assets/scss/vars.scss')
      ]
    }
  },
  css: {
    sourceMap: true
  }
  // configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin({
  //       analyzerMode: 'server',
  //       analyzerHost: '127.0.0.1',
  //       analyzerPort: 8888,
  //       reportFilename: 'report.html',
  //       defaultSizes: 'parsed',
  //       openAnalyzer: true,
  //       generateStatsFile: false,
  //       statsFilename: 'stats.json',
  //       statsOptions: null,
  //       logLevel: 'info'
  //     })
  //   ]
  // }
}
