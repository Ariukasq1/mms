module.exports = {
    purge: [],
    theme: {
        screens: {
            'sm': {'min': '320px', 'max': '767px'},
            'md': {'min': '768px', 'max': '1023px'},
            'lg': {'min': '1024px', 'max': '1279px'},
            'xl': {'min': '1280px'},
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
