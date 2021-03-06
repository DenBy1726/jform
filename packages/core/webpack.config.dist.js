var path = require("path");
var webpack = require("webpack");

module.exports = {
    mode: "production",
    cache: true,
    context: __dirname + "/src",
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "core.js",
        library: "JForm",
        libraryTarget: "umd"
    },
    externals: {
        react: {
            root: "React",
            commonjs: "react",
            commonjs2: "react",
            amd: "react"
        },
        'react-dom': {
            root: "ReactDOM",
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    devtool: "source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
        ]
    }
};