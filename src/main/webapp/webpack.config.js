var path = require("path");
var webpack = require("webpack");
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },
    context: __dirname,
    entry: {
        bundle: './app.jsx',
        nifty: './less/nifty.less'
    },
    output: {
        path: path.join(__dirname, "/../resources/static/site"),
        filename: '[name].js'
    },
    resolve: {
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [node_modules_dir],
                query: {
                    presets: ['react', 'es2015']
                }
            },
            //{
            //    test: /\.less$/,
            //    loader: "style!css!less"
            //},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.json$/,
                loader: require.resolve('json-loader')
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(woff|png)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css")
    ],
    node: {
        net: "empty"
    },
    devtool: 'source-map'
};

config.addVendor('jquery', path.resolve(node_modules_dir, 'jquery/dist/jquery.min.js'));
config.addVendor('bootstrap', path.resolve(node_modules_dir, 'bootstrap/dist/js/bootstrap.min.js'));

module.exports = config;
//module.exports = {
//    entry: './app.jsx',
//    output: {
//        path: path.join(__dirname, "/../resources/static/site"),
//        filename: 'bundle.js'
//    },
//    module: {
//        loaders: [
//            {
//                test: /\.jsx?$/,
//                loader: 'babel-loader',
//                exclude: /node_modules/,
//                query: {
//                    presets: ['react', 'es2015']
//                }
//            },
//            {
//                test: /\.less$/,
//                loader: "style!css!less"
//            },
//            {
//                test: /\.json$/,
//                loader: require.resolve('json-loader')
//            }
//        ]
//    },
//    node: {
//        net: "empty"
//    },
//    devtool: 'source-map'
//}
