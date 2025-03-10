const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
    // Configure fallback for missing Node.js core modules
    config.resolve = {
        ...config.resolve,
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            assert: require.resolve("assert"),
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify"),
            url: require.resolve("url"),
        },
    };

    // Provide global polyfills for process and Buffer
    config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ];

    return config;
};
