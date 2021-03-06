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
    }
});