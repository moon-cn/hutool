const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: {
            name:  "hutool",
            type: "umd"
        },
        clean: true
    },
    externals: {

    }
};