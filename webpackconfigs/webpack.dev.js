/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const BaseConfig = require('./webpack.base.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

module.exports = () => {
    const context = path.resolve(__dirname, '..');
    const config = BaseConfig(context);

    config.mode = 'development';
    config.output.publicPath = '/';

    config.devServer = {
        historyApiFallback: true,
        // contentBase: './dist', // Content base
        host: 'localhost',
        port: 8100,
        hot: true,
        proxy: [
            {
                path: '/favicon.ico',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/favicons/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/static/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/api/v1/auth/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/api/v1/input',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/api/v1/input/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/api/v1/loopbox/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/loopbox/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            },
            {
                path: '/api/v1/sse/**',
                target: 'http://localhost:8084',
                xfwd: true,
                secure: false,
                changeOrigin: true
            }
        ]
    };

    config.module.rules.push(
        {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        getCustomTransformers: () => (
                            {
                                before: [
                                    ReactRefreshTypeScript()
                                ]
                            }
                        )
                    }
                }
            ]
        }
    );

    config.plugins.push(
        new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(false) }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    );

    return config;
};
