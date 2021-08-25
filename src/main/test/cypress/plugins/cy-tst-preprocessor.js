const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = webpackPreprocessor({
    webpackOptions: {
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: "ts-loader"
                }
            ]
        }
    }
});
