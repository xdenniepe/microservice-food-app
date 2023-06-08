import i18n from "i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

if (localStorage.getItem('i18nextLng') === null) {
  localStorage.setItem('i18nextLng', 'en')
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    
    fallbackLng: "en",
	
	detection: {
		order: ['localStorage','cookie', 'htmlTag',  'path', 'subdomain'],
		caches: ['cookie']
	},
	backend:{
		loadPath:'/locales/{{ns}}/{{lng}}.json',
	},

    interpolation: {
        espaceValue: false,
        formatSeparator: ",",
    },
	react: {useSuspense: false},
  });


export default i18n;