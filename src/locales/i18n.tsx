import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import de from "./de.json";
import en from "./en.json";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // lng: "de", // Language to use (overrides language detection)
        interpolation: { escapeValue: false },
        fallbackLng: 'de',
        debug: true,
        resources: {
            en: {
                translation: en, // Use 'translation' as the default namespace
            },
            de: {
                translation: de,
            },
        },
        // ns: list of keys, of the files maybe ???
    });


export default i18next;