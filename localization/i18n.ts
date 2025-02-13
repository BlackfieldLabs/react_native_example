import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import SecureStorage from "../helpers/SecureStorage";

// Locales
import en from "./locales/en.json";
import sr from "./locales/sr.json";
import hr from "./locales/hr.json";

const defaultLanguage = "en";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        sr: { translation: sr },
        hr: { translation: hr },
    },
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

const updateLanguage = async () => {
    try {
        const storedLanguage = await SecureStorage.getData(SecureStorage.Keys.AppLanguage);
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
            console.log(`[${new Date().toLocaleString()}] i18n: Loaded stored language ->`, storedLanguage);
        }
    } catch (error) {
        console.error(`[${new Date().toLocaleString()}] i18n: Error fetching stored language:`, error);
    }
};

updateLanguage();

export default i18n;
