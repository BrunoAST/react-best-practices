const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/main/index.tsx",
    output: {
        //Where the generated build will be placed
        path: path.join(__dirname, "public/js"),
        publicPath: "/public/js",
        //Name of the file that will be used by public/index.html
        filename: "bundle.js"
    },
    //Which type of extension that can be accepted for build and local server listener
    resolve: {
        extensions: [
            ".ts", ".tsx", ".js"
        ]
    },
    devServer: {
        contentBase: "./public",
        writeToDisk: true,
        historyApiFallback: true
    },
    //These dependencies will not be added to the bundle
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
