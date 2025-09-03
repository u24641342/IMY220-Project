const path = require("path");
module.exports = {
    entry: "./frontend/src/index.js",
    output: {
        path: path.resolve("./frontend/public"),
        filename: "bundle.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    }
}