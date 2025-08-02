// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename/asset 名称在各环境通过 [contenthash] 区分
        clean: true,
        publicPath: '/', // 部署在子路径时在 prod 覆盖
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@m': path.resolve(__dirname, 'src/assets/images'),
            '@c': path.resolve(__dirname, 'src/components'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            // JS / JSX
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            // 暂时不设置任何 options
                        },
                    },
                ],
                type: 'javascript/auto',
            },
            // 图片资源（非 svg）
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name].[hash:8][ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // 如果需要在生产/开发插入不同变量，可以用 templateParameters
        }),
    ],
};
