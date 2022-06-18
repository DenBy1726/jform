var path = require("path");

const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
module.exports = merge(common, {

    mode: "development",
    devtool: "inline-source-map",

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3000
    },
    resolve: {
        alias: {
            '@jform/core': path.resolve(__dirname, '../core/src'),
        }
    }


});