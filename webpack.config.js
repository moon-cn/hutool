const path = require("path");

module.exports = {
    entry: "./src/index.js",
    optimization: {
        minimize: false
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            name:  "util",
            type: "umd"
        },
        clean: true
    },
    externals: {

    }
};