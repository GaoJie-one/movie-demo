// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    output: {
        // 开发不需要 hash 方便调试
        filename: '[name].js',
        publicPath: '/', // SPA history fallback
    },
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            // CSS / Sass 用 style-loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        hot: true,
        open: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
});
