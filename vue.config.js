const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin') // cnpm install --save-dev compression-webpack-plugin插件需要npm安装

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // css js 等静态文件目录
  indexPath: 'index.html', // html 的输出路径
  chainWebpack: config => { // 快捷路径
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // lintOnSave: 'error', // 设置eslint报错时停止代码编译
  lintOnSave: false,
  productionSourceMap: false, // 不需要生产环境的 source map（减小dist文件大小，加速构建）
  devServer: {
    open: true, // npm run serve后自动打开页面
    host: '0.0.0.0', // 匹配本机IP地址(默认是0.0.0.0)
    port: 8080 // 开发服务器√运行端口号
    // proxy: {
    //   '/api': {
    //     target: process.env.VUE_APP_BASE_URL, // 代理接口地址
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       '^/api': '' // 需要rewrite的, 这里理解成以'/api'开头的接口地址，把/api代替target中的地址
    //     }
    //   }
    // }
  }
  // chainWebpack: (config) => {
  //   // 移除 prefetch 插件(针对生产环境首屏请求数进行优化)
  //   config.plugins.delete('prefetch')
  //   // 移除 preload 插件(针对生产环境首屏请求数进行优化)
  //   config.plugins.delete('preload')
  //   // 第1个参数：别名，第2个参数：路径  （设置路径别名）
  //   config.resolve.alias
  //     .set('@pages', resolve('./src/page'))
  //     .set('@router', resolve('./src/router'))
  //     .set('@store', resolve('./src/store'))
  //     .set('@utils', resolve('./src/utils'))
  // }
  // 配置打包 js、css文件为.gz格式，优化加载速度  （参考：https://blog.csdn.net/qq_31677507/article/details/102742196）

  // 打包压缩，报错所以注掉
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     return {
  //       plugins: [new CompressionPlugin({
  //         test: /\.js$|\.css/, // 匹配文件
  //         threshold: 10240, // 超过10kB的数据进行压缩
  //         deleteOriginalAssets: false // 是否删除原文件 （原文件也建议发布到服务器以支持不兼容gzip的浏览器）
  //       })],
  //       performance: { // 生产环境构建代码文件超出以下配置大小会在命令行中显示警告
  //         hints: 'warning',
  //         // 入口起点的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
  //         maxEntrypointSize: 5000000,
  //         // 生成文件的最大体积 整数类型（以字节为单位,默认值是：250000 (bytes)）
  //         maxAssetSize: 3000000
  //         // // 只给出 js 文件的性能提示
  //         // assetFilter: function (assetFilename) {
  //         //   return assetFilename.endsWith('.js')
  //         // }
  //       }
  //     }
  //   }
  // }
}
