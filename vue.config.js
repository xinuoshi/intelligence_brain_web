module.exports = {
    // 基本路径
    baseUrl: process.env.NODE_ENV === "production" ? "/" : "/", // 应用程序部署目录
    // 输出文件目录
    outputDir: "dist",
    assetsDir: "static",
    // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
    // outputDir: 'dist',
    // pages:{ type:Object,Default:undfind }
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8080, // 端口号
        // host: "localhost",
        https: false, // https:{type:Boolean}
        open: true, // 配置自动启动浏览器
        // proxy: "http://192.168.1.113:8080" // 配置跨域处理,只有一个代理
        proxy: {
            "/wit_harns_service": {
                // target: "http://211.159.157.184:8080",
                // target: "http://192.168.1.223:8080",
                target: "http://49.233.119.104:80",
                // target: "http://211.159.188.107:81",
                // target: "http://211.159.157.184",
                //  target: "http://192.168.1.153:8080",
                //  target: "http://192.168.1.166:8080",
                // target: "http://10.20.5.19",
                // target: "http://192.168.1.158:8080",
                // target: "http://192.168.1.188:8080",
                // ws: true,
                changeOrigin: true
            },
            "/map_service": {
                target: "http://127.0.0.1:8083",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/map_service": ""
                }
            },
            "/geoserver": {
                // target: "http://211.159.188.107:8081",
                target: "http://47.105.212.6:8080",
                // ws: true,
                changeOrigin: true
                // logLevel: "debug"
            },
            "/sjh1": {
                // target: "http://10.20.5.19:10099",
                target: "http://124.239.251.180:10099",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/sjh1": ""
                }
            },
            "/sjh2": {
                // target: "http://10.20.5.19:11110",
                target: "http://172.58.100.199:11110",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/sjh2": ""
                }
            },
            "/sjh3": {
                // target: "http://10.20.5.19:11110",
                target: "http://172.58.100.199:11110",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/sjh3": ""
                }
            },
            "/sjh4": {
                // target: "http://10.20.5.19:11110",
                target: "http://172.58.100.199:11110",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/sjh4": ""
                }
            },
            "/sjh5": {
                target: "http://10.20.5.13:8080",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/sjh5": ""
                }
            },
            "/sjhvi": {
                target: "http://10.20.5.19:8080",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/sjhvi": ""
                }
            }
        } // 配置多个代理
    }
};

// module.exports = {
//     // 基本路径
//     baseUrl: '/',
//     // 输出文件目录
//     outputDir: 'dist',
//     // eslint-loader 是否在保存的时候检查
//     lintOnSave: true,
//     // use the full build with in-browser compiler?
//     // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
//     compiler: false,
//     // webpack配置
//     // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
//     chainWebpack: () => {},
//     configureWebpack: () => {},
//     // vue-loader 配置项
//     // https://vue-loader.vuejs.org/en/options.html
//     vueLoader: {},
//     // 生产环境是否生成 sourceMap 文件
//     productionSourceMap: true,
//     // css相关配置
//     css: {
//         // 是否使用css分离插件 ExtractTextPlugin
//         extract: true,
//         // 开启 CSS source maps?
//         sourceMap: false,
//         // css预设器配置项
//         loaderOptions: {},
//         // 启用 CSS modules for all css / pre-processor files.
//         modules: false
//     },
//     // use thread-loader for babel & TS in production build
//     // enabled by default if the machine has more than 1 cores
//     parallel: require('os').cpus().length > 1,
//     // 是否启用dll
//     // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
//     dll: false,
//     // PWA 插件相关配置
//     // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
//     pwa: {},
//     // webpack-dev-server 相关配置
//     devServer: {
//         env: require("./dev.env"),
//         port: 8080,
//         autoOpenBrowser: true,
//         assetsSubDirectory: "static",
//         assetsPublicPath: "/",
//         proxyTable: {
//             "/wit_harns_service": {
//                 target: "http://192.168.1.213:8080",
//                 changOrigin: true,
//                 logLevel: "debug"
//             },
//             "/file": {
//                 target: "http://192.168.1.213",
//                 changOrigin: true,
//                 pathRewrite: {
//                     "^/file": "/file"
//                 }
//             }
//         },
//         // 第三方插件配置
//         pluginOptions: {
//             // ...
//         }
//     }
// };
