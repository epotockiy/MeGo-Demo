// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const webpack = require('webpack');
//
// module.exports = {
//     entry: {
//         app: './src/index.js'
//
//     },
//     devtool: 'inline-source-map',
//     devServer: {
//         contentBase: './dist',
//         hot:true
//     },
//     module: {
//          rules: [
//            {
//              test: /\.css$/,
//              use: ['style-loader', 'css-loader']
//        }
//      ]
//    },
//     plugins: [
//         // new CleanWebpackPlugin(['dist']),
//         new HtmlWebpackPlugin({
//             title: 'Output Management'
//         }),
//         new webpack.HotModuleReplacementPlugin(),
//
//     ],
//
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//
//     }
// };
//

///////////////////////////////////////////////////////////////////////////
// // module.exports = function(env) {
// //     return require(`./webpack.${env}.js`)
// // };
///////////////////////////////////////////////////////////////////////////
// const path = require('path');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// module.exports = {
//     entry: {
//         app: './src/index.js'
//     },
//     plugins: [
//         new CleanWebpackPlugin(['dist']),
//         new HtmlWebpackPlugin({
//             title: 'Production'
//         }),
//         new webpack.optimize.CommonsChunkPlugin({
//             name: 'common' // Specify the common bundle's name.
//         })
//     ],
//
//     output: {
//         filename: '[name].bundle.js',
//         path: path.resolve(__dirname, 'dist')
//     }
// };
// //new CleanWebpackPlugin(['!dist/js/*.bundle.js','!dist/**/*.html']),
//////////////////////////////////////////////////////////////////////////////////////////
// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');
// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
//
// var extractPlugin = new ExtractTextPlugin({
//     filename: 'css/main.css'
// });
// module.exports = {
//     entry: {
//         app: './src/js/index.js'
//
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js'
//     },
//
//     devtool: 'inline-source-map',
//     // devServer: {
//     //     contentBase: './dist',
//     //     hot: true
//     // },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 use: [{
//                     loader: 'file-loader',
//                     options: {
//                         name:'[name].[ext]'
//
//                     }
//                 }
//
//                 ]
//             },
//             {
//                 test: /\.scss$/,
//                 use: extractPlugin.extract({
//                     use: ['style-loader','css-loader', 'sass-loader']
//                 })
//             },
//             {
//                 test: /\.html$/,
//                 loader: 'html-loader',
//                 options:{
//                     pretty:true
//                 }
//             },
//             {
//                 test: /\.(jpg|png)$/,
//                 use: [{
//                     loader: "file-loader",
//                     options: {
//                         name: 'img/[name].[ext]'
//                     }
//                 }]
//             }
//
//         ]
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             $: 'jquery',
//             jQuery: 'jquery'
//         }),
//         extractPlugin,
//
//         new HtmlWebpackPlugin({
//             template: 'src/index.html'
//         }),
//         new CleanWebpackPlugin(['dist'])
//         // new webpack.HotModuleReplacementPlugin(),
//
//     ],
//
// };
////////////////////////////////////////////////////////
var path = require('path');
var merge = require('webpack-merge');
var devServer = require('./webpack/devServer');
var htmlConfig = require('./webpack/htmlConfig');
var sass = require('./webpack/sass');
var cssExtract = require('./webpack/cssExtract');
var images =require('./webpack/images')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');

// var extractPlugin = new ExtractTextPlugin({
//     filename: 'main.css'
// });
const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

var common = merge([
    {
        entry: {
            app: PATHS.src + '/index.js'

        },
        output: {
            path: PATHS.dist,
            filename: 'js/[name].js'
        },

        devtool: 'inline-source-map',
        // devServer: {
        //     contentBase: './dist',
        //     hot: true
        // },
        // module: {
        //     rules: [
        //         // {
        //         //     test: /\.js$/,
        //         //     use: [{
        //         //         loader: 'file-loader',
        //         //         options: {
        //         //             name: '[name].[ext]'
        //         //
        //         //         }
        //         //     }
        //         //
        //         //     ]
        //         // },
        //         // {
        //         //     test: /\.(jpg|png)$/,
        //         //     use: [{
        //         //         loader: "file-loader",
        //         //         options: {
        //         //             name: 'img/[name].[ext]'
        //         //         }
        //         //     }]
        //         // }
        //
        //     ]
        // },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            // extractPlugin,

            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html'
            }),
            new CleanWebpackPlugin(['dist'])
            // new webpack.HotModuleReplacementPlugin(),

        ]
    },
    htmlConfig(),
    images()
]);

module.exports = function (env) {
    if (env === 'production') {
        return merge([common, cssExtract()
        ]);
    }
    if (env === 'development') {
        return merge([
                common,
                devServer(),
                sass()
            ]
        );
    }

}