import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files (or load dynamically from a backend)
import en from "./locales/en.json";
import sr from "./locales/sr.json"; // Example for Serbian

i18n
  .use(initReactI18next) // Bind react-i18next to React
  .init({
    resources: {
      en: { translation: en },
      sr: { translation: sr },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
