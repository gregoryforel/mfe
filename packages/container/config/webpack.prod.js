const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')

const domain = process.env.PRODUCTION_DOMAIN

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        // used any time some part of webpack tries to refer to a file built by
        // webpack. It will prepend the files with below path.
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            // Name is not strictly required, because 'container' is a "host" module
            // but, nice practice to name it anyways.
            name: 'container',
            remotes: {
                // Location of child app remoteEntry.js must be known at build time!
                marketing: `marketing@${domain}/marketing/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        }),
    ],
}

module.exports = merge(commonConfig, prodConfig)