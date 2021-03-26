const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const packageJson = require('../package.json')

const commonConfig = require('./webpack.common')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html',
        },
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                // the name "marketing" before @, matches up with the name inside
                // ModuleFederationPlugin's config marketing/.../webpack.dev.js
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
            },
            shared: packageJson.dependencies,
        }),
    ],
}

// Listing devConfig second overrides commonConfig
module.exports = merge(commonConfig, devConfig)
