module.exports = function (paths) {
    return {
        module: {
            rules: [{
                test: /\.html$/,
                loader: 'html-loader'
            }
            ]
        }
    }
}

