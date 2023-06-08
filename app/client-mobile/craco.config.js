const webpack = require('webpack')

module.exports = {
    webpack: {
        configure: {
            output: {
            filename: '[name].[fullhash].js',
            },
            resolve: {
                fallback: {
                    process: require.resolve('process/browser'),
                    zlib: require.resolve('browserify-zlib'),
                    stream: require.resolve('stream-browserify'),
                    util: require.resolve('util'),
                    buffer: require.resolve('buffer'),
                    asset: require.resolve('assert'),
                    crypto: require.resolve("crypto-browserify"),
                },
                alias: {
                    process: 'process/browser',
                    zlib: 'browserify-zlib',
                    stream: 'stream-browserify',
                    util: 'util',
                    buffer: 'buffer',
                    asset: 'assert',
                }
            },
            devServer: {
                host: '0.0.0.0',
                port: 3000
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                    process: 'process/browser',
                }),
            ],
        },
    },
}