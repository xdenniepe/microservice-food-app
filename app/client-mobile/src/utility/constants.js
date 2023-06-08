import LOGO from "../assets/images/logo.png";
import LOGO_HOME from "../assets/images/LOGO_HOME.png";
import YE_LOGO from "../assets/images/ye-logo.png";
import BACKGROUND1 from "../assets/images/ramenbg-1.png";
import SUCCESS from "../assets/images/success.png";
import QR_CODE from "../assets/images/QR-Code.png";
import RESETCONFIRMATION from "../assets/images/reset-confirmation.png";
import EMPTY_PURCHASEHISTORY from "../assets/images/nohistory.png";
import EMPTY_CART from "../assets/images/Empty-logo.svg"
import RAMEN1760X1080 from "../assets/images/ramen-1760x1080.png";
import RAMEN800X1240 from "../assets/images/ramen-800x1240.png";
import RAMEN1920X1200 from "../assets/images/ramen-1920x1200.png";
import RAMEN320X568 from "../assets/images/ramen-320x568.png";
import RAMEN240X320 from "../assets/images/ramen-240x320.png";
import BGCOLORONLY from "../assets/images/bg_color_only.png";
import RAMEN_REWARDS from "../assets/images/ramen-rewardsIcon.png";
import LOGOUTCOFFEECUP from "../assets/images/logoutconfirmationcoffeecup.png";
import FACEBOOK_LOGO from "../assets/images/Facebook-logo.png";
import GOOGLE_LOGO from "../assets/images/Google-logo.png";
import APPLE_LOGO from "../assets/images/Apple-logo.png";
import MENU_CAROUSEL_1 from "../assets/images/menucarousel/ramen_menu_1.JPG"
import MENU_CAROUSEL_2 from "../assets/images/menucarousel/ramen_menu_2.JPG"
import MENU_CAROUSEL_3 from "../assets/images/menucarousel/ramen_menu_3.jpeg"
import REWARDSCLAIM from "../assets/images/rewards-claim.png";
import CREDITCARDLOGO from "../assets/images/Credit-card-logo.png";
import PAYPALLOGO from "../assets/images/paypal-logo.png";
import PAYPAL_ICON from "../assets/images/payments/Paypal-Payment-Logo.png";
import PAYPAL_IMAGE from "../assets/images/payments/Paypal-Payment-Image.png";
import ADVISORY from "../assets/images/loudspeaker.png";
import HELPFUL_TIP from "../assets/images/helpful.png";
import OFFER from "../assets/images/tag.png";
import NEW_PRODUCT from "../assets/images/ramen-icon.png";
import TRASNBINS from "../assets/images/trashbin.png";
import GLOBEICON from "../assets/images/globeIcon.png";
import GIFTBOX from "../assets/images/gift_box.png";
import GIFTBOXCARD from "../assets/images/gift_box_card.png";
import DOGGORAMEN from "../assets/images/doggoramen.png";
import ADDTOFAVORITES from "../assets/images/addtofavorites.png";
import UFOICON from "../assets/images/UFO.svg";
import BOWLINGICON from "../assets/images/BOWLING.png";
import PINICON from "../assets/images/PinIcon.svg";
import MAPICON from "../assets/images/Map.svg";
import DEFAULTBUILDING from "../assets/images/defaultBuildingImg.png";
import OCTOEMPTY from "../assets/images/Octo-empty.svg";
import FAVE_EMPTY from "../assets/images/FaveList.svg";



// TODO: Change SVG images to PNG (if not icons)
import DEBITCARD from "../assets/images/payments/tempo-card-icon.png";
import CREDITCARD from "../assets/images/payments/tempo-card-icon.png";

//GOOGLE MAPS
import USERMARK from "../assets/images/user-loc-marker.svg";
import LOCATIONPIN from "../assets/images/locationpin.png";

// PRODUCTS
import ASARI from "../assets/images/products/Asari-Ramen.webp";
import BEEF_PHO from "../assets/images/products/Beef-Pho.webp";
import BLACK_GARLIC from "../assets/images/products/Black-Garlic-Tonkotsu-Ramen.webp";
import CHICKEN_PHO from "../assets/images/products/Chicken-Pho.webp";
import WAGYU_RAMEN from "../assets/images/products/Japanese-A5-Wagyu-Ramen.webp";
import KOREAN_SEAFOOD from "../assets/images/products/Korean-Seafood-Jjamppong.webp";
import SHIO from "../assets/images/products/Shio-Ramen.webp";
import SHOYU from "../assets/images/products/Shoyu-Ramen.webp";
import SHRIMP_TEMP from "../assets/images/products/Shrimp-Temp.webp";
import SPICY_MISO from "../assets/images/products/Spicy-Kimchi-Miso-Pork-Ramen.webp";
import TANTANMEN from "../assets/images/products/TantanMen-Ramen.webp";
import TONKOTSU from "../assets/images/products/Tonkotsu-Ramen.webp";
import VEGAN_UDON from "../assets/images/products/Vegan-Udon.webp";

//NUTRITION FACTS
import ASARI_NF from "../assets/images/nutrition-facts/asari-clam-ramen.png";
import BEEF_PHO_NF from "../assets/images/nutrition-facts/beef-pho.png";
import BLACK_GARLIC_NF from "../assets/images/nutrition-facts/black-garlic-tonkotsu-ramen.png";
import SHRIMP_TEMP_NF from "../assets/images/nutrition-facts/shrimp-tempura-udon.png";
import KOREAN_SEAFOOD_NF from "../assets/images/nutrition-facts/spicy-seafood-jjamppong.png";
import VEGAN_UDON_NF from "../assets/images/nutrition-facts/vegetarian-udon.png";

// FORM VALIDATION
export const REQUIRED_FIELD     = 'This field is required.';
export const INVALID_EMAIL      = 'Please enter a valid email address.';
export const INVALID_PASSWORD   = 'Please enter a valid password.';
export const NOT_EXISTS_EMAIL   = 'The email address does not exist.';
export const PASSWORD_NOT_MATCH = "Passwords didn't match.";
export const INVALID_CODE       = 'This code is invalid, please check your messages for the correct code.';
export const INVALID_COUPON     = 'This coupon code does not exist. Please check if the coupon code was keyed in correctly.';
export const INVALID_PHONE      = 'Please enter a valid phone number.';
export const INVALID_CCNAME     = 'Card holder name is invalid.';
export const INVALID_CCNUMBER   = 'Please enter a valid 16-digit number.';
export const INVALID_EXPIRYDATE = 'Expiry date is invalid.';
export const INVALID_CVV        = 'Security code is invalid.';
export const EXPIRED_CARD       = 'The card you are using has expired. Please check your card details and try again.'

// AXIOS CONFIGURATION
export const BEARER = 'Bearer ';
export const GET    = 'GET';
export const POST   = 'POST';
export const PATCH  = 'PATCH';
export const PUT    = 'PUT';
export const DELETE = 'DELETE';

export const LOGIN  = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOCAL  = 'LOCAL';

// PASSWORD REGEX
export const allRegex       = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
export const lowercaseRegex = /(?=.*[a-z])/;
export const uppercaseRegex = /(?=.*[A-Z])/;
export const numericRegex   = /(?=.*\d)/;
export const specialRegex   = /(?=.*[@$!%*#?&])/;
export const phoneRegex     = [/^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g];
export const ccRegexPattern = {
    MASTERCARD      : /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA            : /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER        : /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    DINERS_CLUB     : /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
    JCB             : /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/
};

export const passwordRegex = [
    {
        regex        : lowercaseRegex,
        description  : 'At least 1 lower case character.',
        accessibility: 'You need to input at least 1 lower case character.'
    },
    {
        regex        : uppercaseRegex,
        description  : 'At least 1 upper case character.',
        accessibility: 'You need to input at least 1 upper case character.'
    },
    {
        regex        : numericRegex,
        description  : 'At least 1 numerical number character.',
        accessibility: 'You need to input at least 1 number.'
    },
    {
        regex        : specialRegex,
        description  : 'At least 1 special character.',
        accessibility: 'You need to input at least 1 special character.'
    },
]

// IMAGES
export const IMAGES = {
    OCTOEMPTY,
    LOGO_HOME,
    LOGO,
    YE_LOGO,
    BACKGROUND1,
    RAMEN1760X1080,
    RAMEN800X1240,
    RAMEN1920X1200,
    RAMEN320X568,
    RAMEN240X320,
    RAMEN_REWARDS,
    BGCOLORONLY,
    SUCCESS,
    RESETCONFIRMATION,
    QR_CODE,
    EMPTY_PURCHASEHISTORY,
    EMPTY_CART,
    LOGOUTCOFFEECUP,
    FACEBOOK_LOGO,
    GOOGLE_LOGO,
    APPLE_LOGO,
    USERMARK,
    MENU_CAROUSEL_1,
    MENU_CAROUSEL_2,
    MENU_CAROUSEL_3,
    LOCATIONPIN,
    REWARDSCLAIM,
    CREDITCARDLOGO,
    PAYPALLOGO,
    ADVISORY,
    HELPFUL_TIP,
    OFFER,
    NEW_PRODUCT,
    TRASNBINS,
    GLOBEICON,
    GIFTBOX,
    GIFTBOXCARD,
    DOGGORAMEN,
    ADDTOFAVORITES,
    UFOICON,
    BOWLINGICON,
    PINICON,
    MAPICON,
    DEFAULTBUILDING,
    FAVE_EMPTY,
    
    MENU: {
        "Asari Shio Ramen"            : ASARI,
        "Beef Pho"                    : BEEF_PHO,
        "Black Garlic Tonkotsu Ramen" : BLACK_GARLIC,
        "Chicken Udon"                : CHICKEN_PHO,
        "Japanese A5 Wagyu Ramen"     : WAGYU_RAMEN,
        "Korean Seafood Jjampong"     : KOREAN_SEAFOOD,
        "Shio Ramen"                  : SHIO,
        "Shoyu Ramen"                 : SHOYU,
        "Shrimp Tempura Udon"         : SHRIMP_TEMP,
        "Spicy Kimchi Miso Pork Ramen": SPICY_MISO,
        "TanTanmen"                   : TANTANMEN,
        "Tonkotsu Ramen"              : TONKOTSU,
        "Vegan Udon"                  : VEGAN_UDON,
    },
    NUTRITION_FACTS: {
        "Asari Shio Ramen"           : ASARI_NF,
        "Beef Pho"                   : BEEF_PHO_NF,
        "Black Garlic Tonkotsu Ramen": BLACK_GARLIC_NF,
        "Shrimp Tempura Udon"        : SHRIMP_TEMP_NF,
        "Korean Seafood Jjampong"    : KOREAN_SEAFOOD_NF,
        "Vegan Udon"                 : VEGAN_UDON_NF,
    },

    PAYMENT: {
        DEBITCARD,
        CREDITCARD,
        PAYPAL_ICON,
        PAYPAL_IMAGE
    },
}

export const PAYMENTS = {
    DEBIT: 'DEBIT',
    CREDIT: 'CREDIT',
}

export const OTHERCARDS = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/
];

export const EXPIRATION_DATE = [
    /[0-9]/,
    /\d/,
    "/",
    /\d/,
    /\d/,
];

export const CVV = [
    /[0-9]/,
    /\d/,
    /\d/,
];

export const INGREDIENTS = {
    "Asari Shio Ramen"           : "Manila Clam, Noodle, Green Onion, Bamboo Shoots, Seaweed, Shio (salt) Base Broth.",
    "Beef Pho"                   : "Water, Salt, Beef Broth Paste (Beef Broth, Salt), Sugar, Beef Fat (Rendered Beef Fat, Natural Flavoring), Yeast Extract, Food Starch Modified, Beef Paste Concentrate (Roasted Beef and Concentrated Beef Stock, Salt, Hydrolyzed Soy, Corn and Wheat Proteins, Maltodextrin, Autolyzed Yeast Extract, Palm Oil, Sugar, Caramel Color, Onion Powder, 2% or Less of Corn Oil, Potato Starch, Disodium Inosinate/ Disodium Guanylate, Modified Corn Starch, Natural Flavors, Lactic Acid, *Other than that Which Naturally Occurs in The Hydrolyzed Proteins and Autolyzed Yeast Extract), Hydrolyzed Vegetable Protein (Hydrolyzed Soy Protein, Safflower Oil), Fish Sauce Powder (Fermented Anchovies (Anchovies and Salt), Maltodextrin , Salt), Onion Powder, Ginger Powder, Xanthan Gum, Cinnamon Powder, Anise Seed Powder, Coriander Seeds Powder, Cloves Powder, Cardamom Powder, Fennel Powder, Citric Acid",
    "Black Garlic Tonkotsu Ramen": "Water, Pork Extract (Pork Extract, Rendered Pork Fat, Salt , Mixed Tocopherol), Salt, Sugar, Soy Sauce (Water, Wheat, Soybeans, Salt), Nonfat Dried Milk, Monosodium Glutamate, Food Starch Modified, Natural Flavor Enhancer Powder (Maltodextrin, Soy Sauce (Soybeans, Salt and Wheat), Salt, Yeast Extract), Hydrolyzed Vegetable Protein (Hydrolyzed Soy Protein, Safflower Oil), Chicken Bouillon Powder (Salt, Maltodextrin, Flavor Enhancers (Monosodium Glutamate, Disodium 5'-Inosinate, Disodium 5'-Guanylate), Dehydrated Chicken Meat, Natural and Artificial Flavoring, Chicken Extract, Sugar, Chicken Fat, Yeast Extract, Spice), Garlic Powder, Vegetable Extract (Maltodextrin, Chinese Cabbage Extract, Salt), Yeast Extract (Yeast Extract, Maltodextrin), Ginger Powder, Xanthan Gum, Disodium Inosinate, Disodium Guanylate, Black Pepper, Disodium Succinate",
    "Shrimp Tempura Udon"        : "Udon, Shrimp Tempura, Carrot, Green Onion, Fish Cake, Seaweed, Tempura Bits, Udon Soup.",
    "Korean Seafood Jjampong"    : "Manila clam, Squid, Mussels, Shrimp, Imitation Crab Meat, Zucchini, Carrots, seaweed, Green onion, Yellow Onion, Ramen Noodle, Korean Jjamppong Broth (Spicy).",
    "Vegan Udon"                 : "Soy Sauce (Water, Wheat, Soybeans, Salt, Alcohol), Water, Sugar, Salted Mirin (Water, Dextrose,Rice, Corn Syrup, Salt), Salt, Monosodium Glutamate, Kelp Extract (Kelp Extract, Sugar Alcohol(Sorbitol, Maltitol), Alcohol, Salt, Xanthan Gum), Shiitake Extract (Maltodextrin, Shiitake Extract, Yeast Extract (Yeast Extract, Salt)), Kelp Extract Powder (Maltodextrin, Kombu Extract, Salt), Disodium Inosinate, Disodium Guanylate"
}

export const ALLERGENS = {
    "Asari Shio Ramen"           : "Nuts, Dairy, Shellfish",
    "Beef Pho"                   : "Wheat, Soybean, Fish (Sardine)",
    "Shrimp Tempura Udon"        : "Nuts, Dairy, Shellfish",
    "Black Garlic Tonkotsu Ramen": "Milk, Wheat, Soybean",
    "Korean Seafood Jjampong"    : "Nuts, Dairy, Shellfish",
    "Vegan Udon"                 : "Wheat, Soybean",
}

export const NF_LABELS = {
    "Asari Shio Ramen"           : "Nutrition Facts 1 servings per container TOTAL CALORIES(Kcal)  490 TOTAL FAT (g) 4% daily value TRANS FAT 0g CHOLESETROL (0mg) 0% daily value SODIUM 3230mg CARBOHYDRATES 85g 31% daily value DIETARY FIBER 8g 29% daily value Total SUGAR 6g Includes 0g Added Sugars 0% daily value PROTEIN 30 g VITAMIN D 0mcg 0% daily value CALCIUM 146mg 10% daily value IRON 9mg 50% daily value POTASSIUM 904mg 20% daily value The % Daily value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
    "Beef Pho"                   : "Nutrition Facts 1 servings per container TOTAL CALORIES(Kcal)  570 TOTAL FAT 11g 14% daily value SATURATED FAT 6g 30% daily value TRANS FAT 0g CHOLESETROL 35mg  12% daily value SODIUM 2550mg 111% daily value TOTAL CARBOHYDRATES 87g 32% daily value DIETARY FIBER 10g 36% daily value Total SUGAR 4g Includes 0g Added Sugars 0% daily value PROTEIN 31g VITAMIN D 0mcg 0% daily value CALCIUM 0mg 0% daily value IRON 3mg 15% daily value POTASSIUM 356mg 8% daily value The % Daily value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
    "Black Garlic Tonkotsu Ramen": "Nutrition Facts 1 servings per container TOTAL CALORIES(Kcal)  700 TOTAL FAT (g) 37% daily value TRANS FAT 0g CHOLESETROL (0mg) 13% daily value SODIUM 2500mg CARBOHYDRATES 77g 109% daily value DIETARY FIBER 22g 79% daily value Total SUGAR 41g Includes 0g Added Sugars 0% daily value PROTEIN 32 g VITAMIN D 0mcg 0% daily value CALCIUM 112mg 8% daily value IRON 5mg 30% daily value POTASSIUM 695mg 15% daily value The % Daily value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
    "Shrimp Tempura Udon"        : "Nutrition Facts 1 servings per container CALORIES  620 TOTAL FAT 13g 17% daily value SATURATED FAT 5g 25% daily value TRANS FAT 0g CHOLESETROL 0mg  0% daily value SODIUM 2650mg 115% daily value TOTAL CARBOHYDRATES 102g 37% daily value DIETARY FIBER 11g 39% daily value Total SUGARS 8g Includes 0g Added Sugars 0% daily value PROTEIN 23g VITAMIN D 0mcg 0% daily value CALCIUM 0mg 0% daily value IRON 4mg 20% daily value POTASSIUM 252mg 6% daily value The % Daily value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
    "Korean Seafood Jjampong"    : "Nutrition Facts 1 servings per container CALORIES  490 TOTAL FAT 5g 17% daily value SATURATED FAT 1g 5% daily value TRANS FAT 0g CHOLESETROL 65mg  22% daily value SODIUM 2140mg 93% daily value TOTAL CARBOHYDRATES 79g 29% daily value DIETARY FIBER 13g 46% daily value Total SUGARS 6g Includes 0g Added Sugars 0% daily value PROTEIN 31g VITAMIN D 0mcg 0% daily value CALCIUM 120mg 10% daily value IRON 5mg 30% daily value POTASSIUM 801mg 15% daily value The % Daily value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.",
    "Vegan Udon"                 : "Nutrition Facts 1 servings per container CALORIES  520 TOTAL FAT 5g 6% daily value SATURATED FAT 1.5g 8% daily value TRANS FAT 0g CHOLESETROL 0mg  0% daily value SODIUM 2740mg 119% daily value TOTAL CARBOHYDRATES 98g 36% daily value DIETARY FIBER 9g 32% daily value Total SUGARS 9g Includes 0g Added Sugars 0% daily value PROTEIN 20 g VITAMIN D 0mcg 0% daily value CALCIUM 0mg 0% daily value IRON 3mg 15% daily value POTASSIUM 343mg 8% daily value The % Daily value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice"
}



// For location feature map design

export const MAP_CENTER = { 
    lat: 14.8248203, 
    lng: 120.5109386 
  }; 
  
  export const MAP_CONTAINER = { 
    height: '800px', 
    width : '100vw', 
  };
  
  export const MAP_STYLE = [
    {
        elementType: "geometry",
        stylers    : [
            {
                color: "#f1f0ed"
            }
        ]
    },
    {
        elementType: "labels.text.fill",
        stylers    : [
            {
                color: "#707070",
                fontSize: "25px"
            }
        ]
    },
    {
        elementType: "labels.text.stroke",
        stylers    : [
            {
                color: "#FFFFFF"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers    : [
            {
                // color: "#F3F0EB"
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers    : [
            {
                // color: "#FF0000"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers    : [
            {
                color: "#707070"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers    : [
            {
                visibility: "off"
                // color: "#D8D8D8"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers    : [
            {
                // visibility: "off"
                color: "#e5e3df"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.stroke",
        stylers    : [
            {
                color: "#FFFFFF"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers    : [
            {
                color: "#707070"
            }
        ]
    },
    {
        featureType: "poi.attraction",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.business",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.government",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.medical",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.place_of_worship",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.school",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.sports_complex",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers    : [
            {
                color: "#FDFDFC"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers    : [
            {
                color: "#FDFDFC"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers    : [
            {
                color: "#8D8D8D"
            }
        ]
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers    : [
            {
                color: "#707070"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers    : [
            {
                color: "#707070"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers    : [
            {
                color: "#FFFFFF"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "geometry",
        stylers    : [
            {
                color: "#dfd2ae"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers    : [
            {
                color: "#707070"
            }
        ]
    },
    {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers    : [
            {
                color: "#ebe3cd"
            }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "geometry",
        stylers    : [
            {
                color: "#e5e3df"
            }
        ]
    },
    {
        featureType: "transit.station",
        elementType: "labels.icon",
        stylers    : [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "geometry.fill",
        stylers    : [
            {
                color: "#d4f1f9"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers    : [
            {
                color: "#707070"
            }
        ]
    },
  ];