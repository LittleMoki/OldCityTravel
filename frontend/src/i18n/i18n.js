import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import intervalPlural from 'i18next-intervalplural-postprocessor';
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import enTrans from './locales/en/en.json'
import ruTrans from './locales/ru/ru.json'
import uzTrans from './locales/uz/uz.json'

const resources = {
	en: {
		translation: enTrans,
	},
	ru: {
		translation: ruTrans,
	},
	uz: {
		translation: uzTrans,
	},
}

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(intervalPlural)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'ru',
		detection: {
			order: ['queryString', 'cookie'],
			cache: ['cookie'],
		},
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
