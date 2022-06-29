const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    devServer: {
        hot: true,
        static: path.resolve(__dirname, "public")
    },
    devtool: isDevelopment ? "eval-source-map" : "source-map",
    entry: path.resolve(__dirname, "src", "index.tsx"),
    mode: isDevelopment ? "development" : "production",
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(j|t)sx$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            isDevelopment && require.resolve("react-refresh/babel")
                        ].filter(Boolean)
                    }
                }
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        })
    ].filter(Boolean),
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};