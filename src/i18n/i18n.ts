import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


import translationEN from "./en/index.json";
import translationFR from "./fr/index.json";

const resources = {
    en: { translation: translationEN },
    fr: { translation: translationFR },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", 
        keySeparator: false, 
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;