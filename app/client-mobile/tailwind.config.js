module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    variants: {
        borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
    },
    theme: {
        screens: {
        'xss': { max: "240px" },
        'xxs': { max: "320px", min: "241px" },
        'xxss':{ max: "400px"},
        'mds':{ max: "1920px", min: "768px"},
        },
        
        extend: {
            fontSize: {
                'xss' : '8px' ,
                'xxss': '9px',
                'xxs' : '11px',
                'xxd' : '12px',
                'mdss': '13px',
                'mdx' : '15px',
                'mds' : '16px',
            },
            spacing: {
                '21': '84px',
                '23': '88px',
                '26': '104px',
                '30': '116px',
                '34': '136px',
                '38': '148px',
            },
            transformOrigin: {
                "0": "0%",
            },
            zIndex: {
                "-1": "-1",
            },
            dropShadow: {
                primary  : '0 2px 2px rgba(0,0,0,0.16)',
                container: '0 2px 2px rgba(0,0,0,0.20)',
            },
            colors: {
                gray : {
                    50: '#E6E8E9',
                    500: '#707070',
                    550: '#707071',
                    600: '#1A1311',
                },
                primary  : '#FAFAFA',
                secondary: '#751132',
                error    : '#FF5454',
                nav      : '#15224F',
                landing  : '#DCDBD9',
                grayline : '#a3a0a0',
                redlink  : '#cc2d2d'
                

            },
            fontFamily: {
                body: ['Montserrat', 'sans-serif']
            },
            backgroundImage: {
                'giftboxcard': "url('/src/assets/images/gift_box_card.png')",
                'giftboxcardBronze': "url('/src/assets/images/gift-box-card-bronze.png')",
                'giftboxcardSilver': "url('/src/assets/images/gift-box-card-silver.png')",
                'giftboxcardGold': "url('/src/assets/images/gift-box-card-gold.png')",
                'giftboxcardDiamond': "url('/src/assets/images/gift-box-card-diamond.png')"
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
}