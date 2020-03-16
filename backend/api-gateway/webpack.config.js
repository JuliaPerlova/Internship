import { path } from 'path';
import { webpack } from 'webpack';
import { nodeExternals } from 'webpack-node-externals';

module.exports = {
    entry: ['webpack/hot/poll?1000', './src/main.ts'],
    watch: true,
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?1000']
        })
    ],
    plugins: [new webpack.HotModuleReplacementPlugin()],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
}