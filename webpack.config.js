// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i, // 匹配 .scss 和 .sass
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            // --- 简化后的 SVG 规则 (没有 issuer, 没有 svgoConfig, 也没有 file-loader) ---
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
            // --- 图片规则，确保它没有 .svg ---
            {
                test: /\.(png|jpg|jpeg|gif)$/i, // 确保这里没有 .svg
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name].[hash:8][ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@m': path.resolve(__dirname, 'src/assets/images'),
            '@c': path.resolve(__dirname, 'src/components')
        },
        extensions: ['.js', '.jsx', '.json']
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
    }
};