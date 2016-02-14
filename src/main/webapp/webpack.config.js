var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: './app.jsx',
    output: {
        path: path.join(__dirname, "/../resources/static/site"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.json$/,
                loader: require.resolve('json-loader')
            }
        ]
    },
    node: {
        net: "empty"
    },
    devtool: 'source-map'
}
