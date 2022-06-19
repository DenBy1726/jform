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
        modules: [path.resolve('./src'), path.resolve('../core/src'),  path.resolve('../utils/src')],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            "@jform/core":  path.resolve('../core/src'),
            "@jform/utils":  path.resolve('../utils/src'),
            "react": path.resolve('./node_modules/react'),
            'react-dom': path.resolve('./node_modules/react-dom'),
        }
    },

    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { babelrcRoots: [".", "../core/src"] }
            },
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }]
            },
        ]
    },


});