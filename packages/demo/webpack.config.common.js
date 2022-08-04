var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const antdTheme = require('./antdTheme');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/jform'
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['*', '.js', '.jsx', '.json', '.css', 'html'],
        alias: {
            "routes":  path.resolve('./src/routes'),
            "components":  path.resolve('./src/components'),
        }
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
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: ['json', 'javascript']
        })
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
                ],
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
                    "css-loader"
                ],
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules", "monaco-editor")
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader",
                        options: {
                            modifyVars: antdTheme
                        }
                    }
                ]
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