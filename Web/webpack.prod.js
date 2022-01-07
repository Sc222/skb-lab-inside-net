const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: "production",
    target: "browserslist",

    output: {
        filename: "[name].[contenthash:8].bundle.js",
        path: path.resolve(__dirname, "build"),
        assetModuleFilename: "[name].[contenthash:8][ext][query]",
        publicPath: "/",
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
                generator: {
                    filename: "images/[name].[contenthash:8][ext]",
                },
                //asset/resource
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 30 * 1024,
                //     }
                // }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name].[contenthash:8][ext]",
                },
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: { publicPath: "/" },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: { publicPath: "/" },
                    },
                    "css-loader",
                    "postcss-loader",
                    { loader: "less-loader", options: { lessOptions: { javascriptEnabled: true } } },
                ],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash:8].css",
            chunkFilename: "styles/[name].[contenthash:8].chunk.css",
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new Dotenv(),
        new FaviconsWebpackPlugin("./src/assets/favicon.png"),

        // todo setup server to work with this plugin
        new CompressionPlugin({
            algorithm: "gzip",
            compressionOptions: { level: 9 },
            threshold: 0,
            minRatio: 0.8,
        }),
    ],

    // FIXME is it needed ?
    resolve: {
        extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
        alias: {
            src: path.resolve(__dirname, "src"),
        },
    },

    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new HtmlMinimizerPlugin(), "..."], // 2 plugins + "..." for default minimizers
    },
};
