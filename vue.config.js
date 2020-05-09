/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-19 08:46:03
 * @LastEditors: 吴文周
 * @LastEditTime: 2020-05-08 18:04:56
 */
const path = require('path')
const ispro = process.env.NODE_ENV !== 'development'
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    // 多页面时可以配置按需打包
    index: {
      // page 的入口
      entry: 'src/pages/index/main.js',
      // 模板来源
      template: 'src/pages/index/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'EsayWork',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    edit: {
      // page 的入口
      entry: 'src/pages/edit/main.js',
      // 模板来源
      template: 'src/pages/edit/edit.html',
      // 在 dist/index.html 的输出
      filename: 'edit.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'EsayWork',
      chunks: ['chunk-vendors', 'chunk-common', 'edit']
    },
    preview: {
      // page 的入口
      entry: 'src/pages/preview/main.js',
      // 模板来源
      template: 'src/pages/preview/preview.html',
      // 在 dist/index.html 的输出
      filename: 'preview.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'EsayWork',
      chunks: ['chunk-vendors', 'chunk-common', 'preview']
    }
  },
  publicPath: ispro ? '' : '/',
  outputDir: 'app/public',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port:9527,
    proxy: {
      '/api': {
        target: 'http://localhost:8082'
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('base', resolve('baseConfig'))
      .set('public', resolve('public'))
  }
}
