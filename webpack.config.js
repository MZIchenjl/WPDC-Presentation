const path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.(png|jpg|ico|eot|svg|ttf|woff|woff2)$/,
            use: [{
                loader: 'url-loader',
                query: {
                    name: '[name].[ext]',
                    limit: 1000,
                    outputPath: 'cover/'
                }
            }]
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }]
            })
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0',
        compress: true,
        hot: true,
        inline: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['main'],
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
}
