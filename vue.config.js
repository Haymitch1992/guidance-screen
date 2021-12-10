module.exports = {
  publicPath: '/',//vue-cli3.3+新版本使用
  devServer: {
      // 设置主机地址
      // 设置默认端口
      port: 8080,
      open: false,//项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
      proxy: {
        //   '/api': {//代理api
        //       target:'http://172.51.215.157:8083/',
        //       changeOrigin: true,//是否跨域
        //       ws: true, // proxy websockets
        //       pathRewrite: {//重写路径
        //           "^/api": '/api'
        //       }
        // },
        '/api/v1/device/platform_ats/': {//代理api
          //target: "http://192.168.62.228:9092",//测试api地址
          target:'http://172.51.215.158:8081',
          //target: "http://101.200.86.95:9092",//开发api地址http://192.168.62.228:9092/
          changeOrigin: true,//是否跨域
          ws: true, // proxy websockets

        },
        '/api/v1/device/platform_ips/': {//代理api
          //target: "http://192.168.62.228:9092",//测试api地址
          target:'http://172.51.215.159:30080',
          //target: "http://101.200.86.95:9092",//开发api地址http://192.168.62.228:9092/
          changeOrigin: true,//是否跨域
          ws: true, // proxy websockets

        },

        '/api2': {
          target: 'http://172.51.215.158:8081/',
          ws: true,
          changeOrigin: true,
          pathRewrite: {//重写路径
            "^/api2": '/api'
          },
        },
      // },
          '/ags': {//代理api
            //target: "http://192.168.62.228:9092",//测试api地址
            target:'http://172.51.215.159:8085/',
            //target: "http://101.200.86.95:9092",//开发api地址http://192.168.62.228:9092/
            changeOrigin: true,//是否跨域
            ws: true, // proxy websockets
            pathRewrite: {//重写路径
                "^/ags": '/api'
              },
        },

      }
  }
}
