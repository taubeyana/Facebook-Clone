const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './js/main.js',
    output: {
        filename: 'app.js'
    },
    devtool: 'source-map',
    mode: 'development',
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
        },
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }]
    },
    
    plugins: [
		new HtmlWebpackPlugin({
            template: 'index.html'
        }),
	]
}