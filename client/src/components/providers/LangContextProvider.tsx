import i18next from 'i18next';
import React, { createContext, useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import enTranslation from '../../i18n/en.json';
import frTranslation from '../../i18n/fr.json';

type LangContextProviderProps = {
  children: React.ReactNode;
};

type Lang = 'en' | 'fr';
interface ILangContext {
  lang: Lang;
  changeLang: (lang: Lang) => void;
  getText: (key: string) => string;
}

export const defaultLang: Lang = getDefaultLang()
export const LangContext = createContext<ILangContext>({ lang: defaultLang, changeLang: () => {}, getText: () => '' });

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation }
    },
    lng: defaultLang,
    interpolation: { escapeValue: false }
  })

const LangContextProvider:React.FC<LangContextProviderProps> = ({ children }) => {
  const [lang, setLang] = useState(defaultLang);
  const { t } = useTranslation();
  
  const changeLang = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem('language', newLang);
    i18next.changeLanguage(newLang);
  }
  const getText = (key: string) => {
    return t(key)
  }
  
  return <LangContext.Provider value={{ lang, changeLang, getText }}>
    {children}
  </LangContext.Provider>
}
export default LangContextProvider;


function getDefaultLang(): Lang {
  const lang = localStorage.getItem('language');
  if (lang) return lang as Lang;
  
  const defaultLang = navigator.language.toLowerCase().includes('fr') ? 'fr' : 'en';
  localStorage.setItem('language', defaultLang);
  
  return defaultLang
}