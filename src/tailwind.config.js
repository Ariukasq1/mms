module.exports = {
    purge: [],
    theme: {
        screens: {
            'sm': {'min': '320px', 'max': '767px'},
            'md': {'min': '768px', 'max': '1023px'},
            'lg': {'min': '1024px', 'max': '1280px'},
            'xl': {'min': '1281px', 'max': '1440px'},
            'xxl': {'min': '1441px'},
        },
        extend: {
            colors: {
                menuTextColor: '#00498e',
            },
            spacing: {
                "28": "7rem"
            }
        },
    },
    variants: {},
    plugins: [],
}
