var path = require("path");
var webpack = require("webpack");
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    context: __dirname,
    entry: {
        bundle: './app.jsx',
        'vendors': ['jquery', 'bootstrap'],
        'vendors.style.min': [ 'bootstrap-style', 'font-awesome'],
        'react.bundle': ['react', 'react-dom'],
        'nifty.min': ['nifty-script', 'nifty-style']
    },
    output: {
        path: path.join(__dirname, "/../resources/static/site"),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'bootstrap-style': path.resolve(node_modules_dir, 'bootstrap/less/bootstrap.less'),
            'font-awesome': path.resolve(node_modules_dir, 'font-awesome/less/font-awesome.less'),
            'react': path.resolve(node_modules_dir, 'react'),
            'react-dom': path.resolve(node_modules_dir, 'react-dom'),
            'nifty-script': path.resolve(__dirname, 'nifty/nifty.js'),
            'nifty-style': path.resolve(__dirname, 'nifty/nifty.less')
        }
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
                },
            },
            {
                // Some legacy modules rely on this being the window object. This becomes a problem when the module is executed in a CommonJS context where this equals module.exports. In this case you can override this with the imports-loader.
                test: /[\/\\]nifty[\/\\]nifty\.js$/,
                loader: "imports?this=>window"
            },
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
            }, 
            {
                test: /\.css$/, 
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $               : 'jquery',
            jQuery          : 'jquery',
            'window.jQuery' : 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.bundle.js', Infinity),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    node: {
        net: "empty"
    },
    devtool: 'source-map'
};

config.addVendor('jquery', path.resolve(node_modules_dir, 'jquery/dist/jquery.min.js'));
config.addVendor('bootstrap', path.resolve(node_modules_dir, 'bootstrap/dist/js/bootstrap.min.js'));

module.exports = config;