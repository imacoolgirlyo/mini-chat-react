const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devtool : "inline-source-map",
    devServer : {
        contentBase : path.join(__dirname, '../output'),
        compress : true,
        port : 9000
    },
    output: {
        path: path.resolve(__dirname, "../output"),
        filename: "awesome-output.js"
    },
    module : {
        rules : [
            {
                test: /\.css$/, 
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template : './src/index.html'
        })
    ]
}