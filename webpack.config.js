const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: 'awesome-typescript-loader'
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 8000
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' })
    ]
}