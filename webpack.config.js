// 由于webpack 是基于 Node 构建的，所以，webpack的配置文件中，任何合法的Node代码都是支持的
var path= require('path')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们没有提供 要打包的 文件的 入口和出口，此时，他会检查项目根目录的配置文件，并读取，就拿到了导出的这个 配置对象，根据这个对象，进行打包构建
module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),//输出路径
        filename:'bundle.js'//指定输出文件的名称
    },
    plugins:[
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),  //指定模板文件路径
            filename:'index.html'   //设置生成的内存页面的名称
        }),
        new VueLoaderPlugin({}),
    ],
    mode: 'development',
    module: {   //配置所有第三方loader模块
        rules:[ //第三方模块的匹配规则
            {test: /\.css$/, use: ['style-loader','css-loader']},
            //处理 css文件的loader || cnpm i style-loader css-loader -D
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            //处理 less文件的loader ||cnpm i less-loader less -D
            {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
            //处理 sass文件的loader ||cnpm i sass-loader node-sass -D
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=264&name=[hash:8]-[name].[ext]' },
            // 处理图片路径的loader ||// cnpm i url-loader file-loader -D
            // 切换国内镜像  npm install -g mirror-config-china --registry=http://registry.npm.taobao.org 

            // limit给定的值是图片的大小，单位是 byte，如果我们引用的 图片，大于或等于给定的 limit 值，则不会被转为 base64 格式的字符串，如果 图片小于给定的 limit 值，则会被转为 base64 的字符串
            {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },//处理字体文件的loader
            {test: /\.js$/, use:'babel-loader', exclude:/node_modules/}, //配置babel 来转换高级的ES语法
            {test: /\.vue$/, use:'vue-loader'} //处理 .vue 文件的 loader
        ]

    },
    resolve: {
        alias:{//修改vue被导入时的包的路径
            "vue$":'vue/dist/vue.js'
        }
    }
}