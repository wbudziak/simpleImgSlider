module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'index.ts',
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
};
