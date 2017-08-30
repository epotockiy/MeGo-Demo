module.exports = function (paths) {
    return {
        module: {
            rules: [{
                test: /\.(jpg|png|jpeg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }]
            }
            ]
        }
    }
};
