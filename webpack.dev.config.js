const {ProvidePlugin} = require("webpack");

const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const libraryName = "circliful";

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: `${libraryName}.js`,
        library: libraryName,
        path: path.resolve(__dirname, "./dist"),
    },
    target: "web",
    devtool: "inline-source-map",
    mode: "development",
    devServer: {
        port: 9090,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                use: [
                    "file-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", "css-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", "css-loader", "sass-loader",
                ],
            },
            {
                test: /\.hbs$/,
                use: [
                    "handlebars-loader",
                ],
            },
            {
                test: /\.ts$/,
                exclude: "/node_modules",
                use: "ts-loader",
            },
            {
                test: /\.ts$/,
                enforce: "pre",
                use: [
                    {
                        loader: "tslint-loader",
                        options: {
                            configFile: "tslint.json",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ],
    },
    plugins: [
        new ProvidePlugin({
            Promise: "es6-promise-promise",
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*",
                //path.join(process.cwd(), 'build/**/*') //clean other folders also
            ],
        }),
        new HtmlWebpackPlugin({
            title: "Hello world",
            template: "templates/index.hbs",
            description: "Circliful showcase",
            inject: false,
        }),
    ],
};
