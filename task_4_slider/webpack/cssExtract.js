var extractTextPlugin = require('extract-text-webpack-plugin');
module.exports = function (paths) {
    return {
        module: {
            rules: [{
                test: /\.scss$/,
                include: paths,
                use: extractTextPlugin.extract({
                    publicPath: '../',
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                }),

            }, {
                test: /\.css$/,
                include: paths,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                }),
            }
            ]
        },
        plugins: [
            new extractTextPlugin('./css/[name].css')
        ],
    }
};
