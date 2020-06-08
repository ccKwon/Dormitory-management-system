var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 图片处理
const assetsPath = function (_path) {
    const assetsSubDirectory = 'static'
    return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),    //项目的打包文件路径
        publicPath: '/dist/',   // 通过devServer访问路径
        filename: 'build.js'     //  打包后的文件名
    },


    devServer: {
        contentBase: './dist',
        historyApiFallback: true,//historyApiFallback设置为true那么所有的路径都执行index.html。
        overlay: true, // 将错误显示在html之上
        inline: true,
        port: 8085,
        open: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8081/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            }
        }
    },


    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },

    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            inject: true
        })
    ],
    module: {
        rules: [

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.vue$/,  // 匹配到该的文件由该规则处理
                use: 'vue-loader'
            },

            // 解析CSS文件
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },

            // ES6转码
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/    // //exclude表示忽略node_modules文件夹下的文件，不用转码
            },

            // 处理图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 7630,
                }
            },
        ],



    },



};