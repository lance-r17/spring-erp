var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
var static_dir = path.join(__dirname, '/../resources/static');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    addVendor: function(name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    context: __dirname,
    entry: {
        'vendors': [
            'jquery',
            'bootstrap-webpack!./config/bootstrap.config.js',
            'font-awesome-webpack!./config/font-awesome.config.js'
        ],
        'nifty': ['nifty-script', 'nifty-style'],
        'react.bundle': [
            'react', 
            'react-dom'
        ],
        'bundle': './app.jsx'
    },
    output: {
        path: path.resolve(static_dir, 'site'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
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
                loader: 'imports?this=>window'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
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
                loader: 'style-loader!css-loader'
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
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        // Remove all before output
        new WebpackCleanupPlugin({
            exclude: []
        }),
        new webpack.ProvidePlugin({
            $               : 'jquery',
            jQuery          : 'jquery',
            'window.jQuery' : 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // vendors must be the last one of names which is the boost
            names: ['react.bundle', 'vendors'], 
            filename: '[name].js'
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    node: {
        net: 'empty'
    },
    devtool: 'source-map'
};

config.addVendor('jquery', path.resolve(node_modules_dir, 'jquery/dist/jquery.min.js'));

module.exports = config;