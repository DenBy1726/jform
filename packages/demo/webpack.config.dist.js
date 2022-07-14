var path = require("path");
var webpack = require("webpack");

const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",

    cache: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "./",
        filename: "@jform/demo.js"
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    resolve: {
        extensions: [".js", ".jsx", ".css"],
        alias: {
            react: path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
            '@emotion/react': path.resolve('./node_modules/@emotion/react'),
            '@emotion/styled': path.resolve('./node_modules/@emotion/styled'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    "babel-loader",
                ],
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "playground"),
                    path.join(__dirname, "node_modules", "mode", "javascript"),
                ],
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
                    path.join(__dirname, "playground"),
                    path.join(__dirname, "node_modules", "monaco-editor"),
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
                    path.join(__dirname, "playground"),
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
});