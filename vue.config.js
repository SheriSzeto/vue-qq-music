const path = require('path');

module.exports = {
  devServer: {
    proxy: 'http://localhost:4000' // 要代理的地址
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, './src/styles/mixin.less'),
        path.resolve(__dirname, './src/styles/variables.less')
      ]
    }
  }
}