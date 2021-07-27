const withFonts = require('next-fonts');
module.exports = withFonts({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                lazyload: true,
                options: {
                    limit: 100000,
                },
            },
        });

        return config;
    },
});
