const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './src/index.html',
            template: './src/index.html',
            title: 'THREEJS webpack project',
            h1: 'THREEJS webpack project',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(bmp|png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(md2)$/i,
                type: 'asset/resource',
            }
        ]
    },
}
