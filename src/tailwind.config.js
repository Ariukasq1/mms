module.exports = {
    purge: [],
    theme: {
        screens: {
            'sm': {'min': '320px', 'max': '480px'},
            'md': {'min': '481px ', 'max': '768px'},
            'lg': {'min': '769px ', 'max': '1024px'},
            'xl': {'min': '1025px', 'max': '1366px'},
        },
        truncate: {
            lines: {
                2: '2',
                3: '3',
                5: '5',
                8: '8',
            }
        },
        extend: {
            screens: {
                '2xl': {'min': '1367px', 'max': '1440px'},
                '3xl': {'min': '1441px'}
            },
            colors: {
                menuTextColor: '#00498e',
                contact: '#262626',
            },
            spacing: {
                "28": "7rem",
                "72": "18rem",
                "80": "20rem",
                "86": "30rem",
            },
            height: {
                'body': 'calc(100vh - 116px)',
            }
        },
    },
    variants: {
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [require('tailwindcss-truncate-multiline')(),],
}
