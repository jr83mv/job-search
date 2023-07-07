import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enTranslations,
            }, 
            fr: {
                translation: frTranslations,
            },
        },
        fallbackLng: 'en',
        lng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: ["en", "fr"],
    });

export default i18n;