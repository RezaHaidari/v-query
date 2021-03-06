const webpack = require('webpack')
const path = require('path')
const production = (process.env.NODE_ENV === 'production')
process.noDeprecation = true

module.exports = {
    entry:'./src/install.js',
    output:{
        path: path.resolve(__dirname,'./dist'),
        filename:'v-query.min.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [["es2015", { "modules": false }], 'stage-2']
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (production) {
    module.exports.devtool = '#source-map'
    module.exports.output.filename = "v-query.min.js",
        module.exports.plugins = (module.exports.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ])
}