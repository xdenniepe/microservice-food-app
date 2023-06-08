import moment from 'moment';

export const notif = [
    {
        notifId : 1,
        userId  : "",
        category: "Advisory",
        title   : "Yo-Kai Virtual Card Advisory! 💳",
        descriptionTitle: "Additional Fee", //secondaryTitle
        description: "Starting today Yo-Kai will be charging additional 0.50$ for the order fee made from transacting a third party payment.",
        path:"",
        createdAt:moment.unix(1663689762).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss"),
        image   : "https://img.freepik.com/free-vector/online-mobile-phone-shopping-illustration_33099-600.jpg?w=1380&t=st=1663747859~exp=1663748459~hmac=876d94a08fa52ffe5ce2acf62c4b7d310137d989512f16e17cda17b3fd73248a",
        seen:"No" // Int - 1/0
    },
    {
        notifId : 2,
        userId  : "",
        category: "Offer",
        title   : "Hello, Just Ramen In! 🍜",
        descriptionTitle: "Battle of the Ramen King! 👑",
        description: "Order to vote for your favorite Ramen Shop/Vendo and get $2 OFF!😋",
        path:"",
        createdAt:moment.unix(1663667566).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss"),
        image   : "https://img.freepik.com/free-vector/restaurant-mural-wallpaper-with-ramen-illustrated_52683-48428.jpg?w=1380&t=st=1663747668~exp=1663748268~hmac=931d137a36609ef1099d053d225ff3fb2cb23a4b56498325b8c73960fae5a0e9",
        seen:"No"
    },
    {
        notifId : 3,
        userId  : "",
        category: "Tip",
        title   : "Learn About Safety! ⛑️",
        descriptionTitle: "Always Wear your Face-Mask!😷",
        description: "Wearing a medical mask is one of the prevention measures to limit spread of certain respiratory diseases, including 2019- nCoV, in affected areas.",
        path:"",
        createdAt:moment.unix(1663663966).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss"),
        image   : "https://img.freepik.com/free-vector/family-protected-from-virus_52683-38997.jpg?w=1380&t=st=1663747354~exp=1663747954~hmac=827b50da7f7ae4b5c2ef9e13c91cf7ba8663fb772c9ae8463401015134dafd0a",
        seen:"Yes"
    },
    {
        notifId : 4,
        userId  : "",
        category: "Offer",
        title   : "Enjoy Deals & More! 🈹💸",
        descriptionTitle: "Last Day to Score the Biggest Sale Ever",
        description: "Order now and enjoy $3 off with code YOKAIDEALS!",
        path:"",
        createdAt:moment.unix(1663581166).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss"),
        image   : "https://img.freepik.com/free-vector/colorful-sale-background_52683-55241.jpg?w=1380&t=st=1663748445~exp=1663749045~hmac=2116e477e6fb1d487c1bc60ab851e5adcbdbff87a6c3dc4d600c586c44613890",
        seen:"Yes"
    },
    {
        notifId : 5,
        userId  : "",
        category: "Offer",
        title   : "Hooray, it's Pay-Yay! 💵🤑",
        descriptionTitle: "Buy and Save!",
        description: "From bills and payments to orders and cravings, be stress-free with ease!😉 Check out these Offers and Deals just for you!🥰",
        path:"",
        createdAt:moment.unix(1663220360).tz('America/Los_Angeles').format("YYYY-MM-DD hh:MM:ss"),
        image   : "https://img.freepik.com/free-vector/hands-holding-throwing-banknotes-air-rich-successful-men-women-showing-money-flat-vector-illustration-investment-finance-entrepreneur-concept_74855-24752.jpg?w=1480&t=st=1663770739~exp=1663771339~hmac=9c7b0ccef596391a15450b70b44fa94fe4b20ce90772d028ecc6c465b36322d9",
        seen:"Yes"
    }
]
