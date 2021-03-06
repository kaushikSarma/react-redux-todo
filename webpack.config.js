const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
module.exports = (env, argv) => {
    return {
        watch: argv.mode === 'production' ? false : true,
        entry: "./src/index",
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: [ ".ts", ".tsx", ".js", ".json" ],
            plugins: [
                new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    },
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "awesome-typescript-loader"
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ["style-loader", "css-loader", {loader: "postcss-loader", options: {plugins: [AutoPrefixer()]}}, "sass-loader"]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
        ]
    };
}