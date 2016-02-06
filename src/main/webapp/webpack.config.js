var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    // entry: './app.jsx',
    output: {
        path: __dirname + "/../resources/static",
        filename: 'bundle.js'
    },
    // module: {
    //     loaders: [
    //         {
    //             test: /\.jsx?$/,
    //             loader: 'babel-loader',
    //             exclude: /node_modules/,
    //             query: {
    //                 presets: ['react', 'es2015']
    //             }
    //         }
    //     ]
    // },
    
    // devtool: 'source-map'
    // context: path.join(__dirname, 'resources/static'),
    plugins: [
        new CopyWebpackPlugin([
            // {output}/file.js
            { from: './*.js', to: '../resources/static'},
            { from: './*.jsx', to: '../resources/static'}
        ], {
            ignore: [
                // Doesn't copy any files with a txt extension    
                '*.txt',

                // Doesn't copy any file, even if they start with a dot
                { glob: '**/*', dot: true }
            ]
        })
    ]
}