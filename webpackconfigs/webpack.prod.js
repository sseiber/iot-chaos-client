/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const BaseConfig = require('./webpack.base.js');

module.exports = () => {
    const context = path.resolve(__dirname, '..');
    const config = BaseConfig(context);

    config.mode = 'production';
    config.cache = false; // Fresh
    config.output.publicPath = '/';

    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';

    config.module.rules.push(
        {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'ts-loader'
                }
            ]
        }
    );

    config.plugins.unshift(
        new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(true) })
    );

    return config;
};
