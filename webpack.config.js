module.exports = {
    // ...other config
    module: {
        rules: [
            // ...other rules
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.mjs', '.js', '.json']
    }
    // ...other config
};
