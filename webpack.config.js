const path = require("path");

module.exports = {
    entry: "./src/index.js",
    optimization: {
        minimize: false
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        // 浏览器直接使用
         library: {
            name:  "hutool",
             type: "umd"
        },
        clean: true
    },
    externals: {
    }
};