var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: './app.jsx',
    output: {
        //path: __dirname + "/../resources/static",
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
         }
     ]
    },
    devtool: 'source-map'
    //resolve: {
    //    root: [path.join(__dirname, "bower_components")]
    //},
    //plugins: [
    //    new webpack.ResolverPlugin(
    //        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    //    )
    //]
}
