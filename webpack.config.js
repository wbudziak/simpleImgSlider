module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
    },
};
