module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'app1.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }]
    }
}