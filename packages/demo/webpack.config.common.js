var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['*', '.js', '.jsx', '.json', '.css', 'html']
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    "babel-loader",
                ],
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules", "mode", "javascript"),
                ]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"]
            },
            {
                test: /\.s?css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules", "monaco-editor")
                ],
            },
            {
                test: /\.less$/,
                include: /node_modules[\\/]antd/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insert: "#antd-styles-iframe"
                        }
                    },
                    "css-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader'],
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules", "monaco-editor"),
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.mjs$/,
                use: []
            }
        ]
    }
};